import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Review from "../models/review.model.js";
import Category from "../models/category.model.js";

class DashboardService {
	// Umumiy statistika
	async getStats() {
		const [
			totalUsers,
			totalProducts,
			totalOrders,
			totalReviews,
			totalCategories,
			totalRevenue,
		] = await Promise.all([
			User.countDocuments(),
			Product.countDocuments(),
			Order.countDocuments(),
			Review.countDocuments(),
			Category.countDocuments(),
			Order.aggregate([
				{
					$group: {
						_id: null,
						total: { $sum: "$totalAmount" },
					},
				},
			]),
		]);

		return {
			totalUsers,
			totalProducts,
			totalOrders,
			totalReviews,
			totalCategories,
			totalRevenue: totalRevenue[0]?.total || 0,
		};
	}

	// Revenue statistikasi (kunlik, haftalik, oylik)
	async getRevenueStats(period = "month") {
		const now = new Date();
		let startDate;

		switch (period) {
			case "day":
				startDate = new Date(now.setHours(0, 0, 0, 0));
				break;
			case "week":
				startDate = new Date(now);
				startDate.setDate(now.getDate() - 7);
				break;
			case "month":
				startDate = new Date(now);
				startDate.setMonth(now.getMonth() - 1);
				break;
			case "year":
				startDate = new Date(now);
				startDate.setFullYear(now.getFullYear() - 1);
				break;
			default:
				startDate = new Date(now);
				startDate.setMonth(now.getMonth() - 1);
		}

		const revenue = await Order.aggregate([
			{
				$match: {
					createdAt: { $gte: startDate },
					status: { $ne: "cancelled" },
				},
			},
			{
				$group: {
					_id: null,
					total: { $sum: "$totalAmount" },
					count: { $sum: 1 },
				},
			},
		]);

		return {
			revenue: revenue[0]?.total || 0,
			orders: revenue[0]?.count || 0,
			period,
		};
	}

	// Order status statistikasi
	async getOrderStatusStats() {
		const stats = await Order.aggregate([
			{
				$group: {
					_id: "$status",
					count: { $sum: 1 },
					totalAmount: { $sum: "$totalAmount" },
				},
			},
		]);

		return stats.map((stat) => ({
			status: stat._id,
			count: stat.count,
			totalAmount: stat.totalAmount,
		}));
	}

	// Revenue by date (chart uchun)
	async getRevenueByDate(fromDate, toDate) {
		const startDate = fromDate
			? new Date(fromDate)
			: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
		const endDate = toDate ? new Date(toDate) : new Date();
		endDate.setHours(23, 59, 59, 999);

		const revenue = await Order.aggregate([
			{
				$match: {
					createdAt: { $gte: startDate, $lte: endDate },
					status: { $ne: "cancelled" },
				},
			},
			{
				$group: {
					_id: {
						$dateToString: {
							format: "%Y-%m-%d",
							date: "$createdAt",
						},
					},
					revenue: { $sum: "$totalAmount" },
					orders: { $sum: 1 },
				},
			},
			{
				$sort: { _id: 1 },
			},
		]);

		return revenue.map((item) => ({
			date: item._id,
			revenue: item.revenue,
			orders: item.orders,
		}));
	}

	// Orders by date (chart uchun)
	async getOrdersByDate(fromDate, toDate) {
		const startDate = fromDate
			? new Date(fromDate)
			: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
		const endDate = toDate ? new Date(toDate) : new Date();
		endDate.setHours(23, 59, 59, 999);

		const orders = await Order.aggregate([
			{
				$match: {
					createdAt: { $gte: startDate, $lte: endDate },
				},
			},
			{
				$group: {
					_id: {
						$dateToString: {
							format: "%Y-%m-%d",
							date: "$createdAt",
						},
					},
					count: { $sum: 1 },
				},
			},
			{
				$sort: { _id: 1 },
			},
		]);

		return orders.map((item) => ({
			date: item._id,
			count: item.count,
		}));
	}

	// Top products (eng ko'p sotilgan)
	async getTopProducts(limit = 10) {
		const topProducts = await Order.aggregate([
			{
				$unwind: "$products",
			},
			{
				$group: {
					_id: "$products.product",
					totalQuantity: { $sum: "$products.quantity" },
					totalRevenue: {
						$sum: {
							$multiply: [
								"$products.quantity",
								"$products.price",
							],
						},
					},
				},
			},
			{
				$sort: { totalQuantity: -1 },
			},
			{
				$limit: limit,
			},
			{
				$lookup: {
					from: "products",
					localField: "_id",
					foreignField: "_id",
					as: "product",
				},
			},
			{
				$unwind: "$product",
			},
			{
				$project: {
					productId: "$_id",
					productName: "$product.name",
					productPrice: "$product.price",
					totalQuantity: 1,
					totalRevenue: 1,
				},
			},
		]);

		return topProducts;
	}

	// Recent orders
	async getRecentOrders(limit = 10) {
		return Order.find()
			.populate("user", "name email")
			.populate("products.product", "name price images")
			.sort({ createdAt: -1 })
			.limit(limit);
	}

	// Products by category
	async getProductsByCategory() {
		const stats = await Product.aggregate([
			{
				$group: {
					_id: "$category",
					count: { $sum: 1 },
				},
			},
			{
				$lookup: {
					from: "categories",
					localField: "_id",
					foreignField: "_id",
					as: "category",
				},
			},
			{
				$unwind: "$category",
			},
			{
				$project: {
					categoryName: "$category.name",
					count: 1,
				},
			},
		]);

		return stats;
	}

	// Dashboard data (barcha ma'lumotlar)
	async getDashboardData(filters = {}) {
		const { fromDate, toDate, period = "month" } = filters;

		const [
			stats,
			revenueStats,
			orderStatusStats,
			revenueByDate,
			ordersByDate,
			topProducts,
			recentOrders,
			productsByCategory,
		] = await Promise.all([
			this.getStats(),
			this.getRevenueStats(period),
			this.getOrderStatusStats(),
			this.getRevenueByDate(fromDate, toDate),
			this.getOrdersByDate(fromDate, toDate),
			this.getTopProducts(10),
			this.getRecentOrders(10),
			this.getProductsByCategory(),
		]);

		return {
			stats,
			revenueStats,
			orderStatusStats,
			revenueByDate,
			ordersByDate,
			topProducts,
			recentOrders,
			productsByCategory,
		};
	}
}

export default new DashboardService();
