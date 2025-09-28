import orderService from "../services/order.service.js";

export const orderController = {
	async create(req, res, next) {
		try {
			const { products } = req.body; // faqat product va quantity keladi

			// productlarning narxini olish uchun servicega yuboramiz
			const order = await orderService.create({
				products,
				user: req.user.id,
			});

			res.status(201).json(order);
		} catch (err) {
			next(err);
		}
	},

	async getByUser(req, res, next) {
		try {
			const orders = await orderService.getByUser(req.user.id);
			res.json(orders);
		} catch (err) {
			next(err);
		}
	},

	async getAll(req, res, next) {
		try {
			const orders = await orderService.getAll();
			res.json(orders);
		} catch (err) {
			next(err);
		}
	},

	async updateStatus(req, res, next) {
		try {
			const updated = await orderService.updateStatus(
				req.params.id,
				req.body.status
			);
			res.json(updated);
		} catch (err) {
			next(err);
		}
	},
};
