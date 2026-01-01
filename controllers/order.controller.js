import orderService from "../services/order.service.js";

export const orderController = {
	async create(req, res, next) {
		try {
			const { products, address } = req.body; // faqat product va quantity keladi

			// productlarning narxini olish uchun servicega yuboramiz
			const order = await orderService.create({
				products,
				user: req.user.id,
				address,
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
			const { fromDate, toDate, status } = req.query;
			const orders = await orderService.getAll({
				fromDate,
				toDate,
				status,
			});
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

	async delete(req, res, next) {
		try {
			const deleted = await orderService.delete(req.params.id);
			if (!deleted) {
				return res
					.status(404)
					.json({ message: "Order not found" });
			}
			res.json({ message: "Order deleted", deleted });
		} catch (err) {
			next(err);
		}
	},
};
