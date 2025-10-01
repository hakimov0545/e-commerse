import productService from "../services/product.service.js";

export const productController = {
	async create(req, res, next) {
		try {
			const product = await productService.create(
				req.body,
				req.files // Multer puts all uploaded files here as an array
			);
			res.status(201).json(product);
		} catch (err) {
			next(err);
		}
	},

	async getAll(req, res, next) {
		try {
			const products = await productService.getAll();
			res.json(products);
		} catch (err) {
			next(err);
		}
	},

	async getById(req, res, next) {
		try {
			const product = await productService.getById(
				req.params.id
			);
			if (!product) {
				return res
					.status(404)
					.json({ message: "Product not found" });
			}
			res.json(product);
		} catch (err) {
			next(err);
		}
	},

	async getByCategory(req, res, next) {
		try {
			const products = await productService.getByCategory(
				req.params.categoryId
			);
			res.json(products);
		} catch (err) {
			next(err);
		}
	},

	async getPopulated(req, res, next) {
		try {
			const product = await productService.getPopulated(
				req.params.id
			);
			if (!product) {
				return res
					.status(404)
					.json({ message: "Product not found" });
			}
			res.json(product);
		} catch (err) {
			next(err);
		}
	},

	async getAllPopulated(req, res, next) {
		try {
			const products = await productService.getAllPopulated();
			res.json(products);
		} catch (err) {
			next(err);
		}
	},

	async update(req, res, next) {
		try {
			const product = await productService.update(
				req.params.id,
				req.body
			);
			res.json(product);
		} catch (err) {
			next(err);
		}
	},

	async delete(req, res, next) {
		try {
			await productService.delete(req.params.id);
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	},
};
