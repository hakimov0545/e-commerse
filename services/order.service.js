import BaseService from "./base.service.js";
import Order from "../models/order.model.js";
import productModel from "../models/product.model.js";

class OrderService extends BaseService {
	constructor() {
		super(Order);
	}

	async create({ user, products }) {
		// productlarni DB dan olish
		const populatedProducts = await Promise.all(
			products.map(async (item) => {
				const product = await productModel.findById(
					item.product
				);
				if (!product) {
					throw new Error(
						`Product ${item.product} not found`
					);
				}
				return {
					product: product._id,
					quantity: item.quantity,
					price: product.price,
				};
			})
		);

		// jami summa hisoblash
		const totalAmount = populatedProducts.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);

		// order yaratish
		const order = await Order.create({
			user,
			products: populatedProducts,
			totalAmount,
		});

		return order;
	}

	// Foydalanuvchining barcha buyurtmalari
	async getByUser(userId) {
		return this.model
			.find({ user: userId })
			.populate("products.product");
	}

	async updateStatus(orderId, status) {
		return this.model.findByIdAndUpdate(
			orderId,
			{ status },
			{ new: true }
		);
	}
}

export default new OrderService();
