import dashboardService from "../services/dashboard.service.js";

export const dashboardController = {
	async getStats(req, res, next) {
		try {
			const stats = await dashboardService.getStats();
			res.json(stats);
		} catch (err) {
			next(err);
		}
	},

	async getRevenueStats(req, res, next) {
		try {
			const { period } = req.query;
			const stats = await dashboardService.getRevenueStats(
				period
			);
			res.json(stats);
		} catch (err) {
			next(err);
		}
	},

	async getOrderStatusStats(req, res, next) {
		try {
			const stats =
				await dashboardService.getOrderStatusStats();
			res.json(stats);
		} catch (err) {
			next(err);
		}
	},

	async getRevenueByDate(req, res, next) {
		try {
			const { fromDate, toDate } = req.query;
			const data = await dashboardService.getRevenueByDate(
				fromDate,
				toDate
			);
			res.json(data);
		} catch (err) {
			next(err);
		}
	},

	async getOrdersByDate(req, res, next) {
		try {
			const { fromDate, toDate } = req.query;
			const data = await dashboardService.getOrdersByDate(
				fromDate,
				toDate
			);
			res.json(data);
		} catch (err) {
			next(err);
		}
	},

	async getTopProducts(req, res, next) {
		try {
			const { limit } = req.query;
			const products = await dashboardService.getTopProducts(
				parseInt(limit) || 10
			);
			res.json(products);
		} catch (err) {
			next(err);
		}
	},

	async getRecentOrders(req, res, next) {
		try {
			const { limit } = req.query;
			const orders = await dashboardService.getRecentOrders(
				parseInt(limit) || 10
			);
			res.json(orders);
		} catch (err) {
			next(err);
		}
	},

	async getProductsByCategory(req, res, next) {
		try {
			const data =
				await dashboardService.getProductsByCategory();
			res.json(data);
		} catch (err) {
			next(err);
		}
	},

	async getDashboardData(req, res, next) {
		try {
			const { fromDate, toDate, period } = req.query;
			const data = await dashboardService.getDashboardData({
				fromDate,
				toDate,
				period,
			});
			res.json(data);
		} catch (err) {
			next(err);
		}
	},
};
