import categoryService from "../services/category.service.js";

export const categoryController = {
	async create(req, res, next) {
		try {
			const category = await categoryService.create(req.body);
			res.status(201).json(category);
		} catch (err) {
			next(err);
		}
	},

	async getAll(req, res, next) {
		try {
			const categories = await categoryService.getAll();
			res.json(categories);
		} catch (err) {
			next(err);
		}
	},

	async getById(req, res, next) {
		try {
			const category = await categoryService.getById(
				req.params.id
			);
			res.json(category);
		} catch (err) {
			next(err);
		}
	},

	async update(req, res, next) {
		try {
			const updated = await categoryService.update(
				req.params.id,
				req.body
			);
			res.json(updated);
		} catch (err) {
			next(err);
		}
	},

	async delete(req, res, next) {
		try {
			await categoryService.delete(req.params.id);
			res.json({ message: "Category deleted" });
		} catch (err) {
			next(err);
		}
	},
};
