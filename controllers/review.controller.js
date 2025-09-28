import reviewService from "../services/review.service.js";
import productService from "../services/product.service.js";

export const reviewController = {
	async create(req, res, next) {
		try {
			const { productId, rating, comment } = req.body;

			const existing = await reviewService.getByUserAndProduct(
				req.user.id,
				productId
			);
			if (existing) {
				return res.status(400).json({
					message: "You already reviewed this product",
				});
			}

			const review = await reviewService.create({
				user: req.user.id,
				product: productId,
				rating,
				comment,
			});

			const avgRating =
				await reviewService.calculateAverageRating(productId);
			await productService.update(productId, {
				rating: avgRating,
			});

			res.status(201).json(review);
		} catch (err) {
			next(err);
		}
	},

	async getByProduct(req, res, next) {
		try {
			const reviews = await reviewService.getByProduct(
				req.params.productId
			);
			res.json(reviews);
		} catch (err) {
			next(err);
		}
	},

	async getById(req, res, next) {
		try {
			const review = await reviewService.getById(req.params.id);
			if (!review) {
				return res
					.status(404)
					.json({ message: "Review not found" });
			}
			res.json(review);
		} catch (err) {
			next(err);
		}
	},

	async update(req, res, next) {
		try {
			const review = await reviewService.getById(req.params.id);
			if (!review) {
				return res
					.status(404)
					.json({ message: "Review not found" });
			}
			if (review.user.toString() !== req.user.id) {
				return res
					.status(403)
					.json({ message: "Not allowed" });
			}

			const updated = await reviewService.update(
				req.params.id,
				req.body
			);

			const avgRating =
				await reviewService.calculateAverageRating(
					review.product
				);
			await productService.update(review.product, {
				rating: avgRating,
			});

			res.json(updated);
		} catch (err) {
			next(err);
		}
	},

	async delete(req, res, next) {
		try {
			const review = await reviewService.getById(req.params.id);
			if (!review) {
				return res
					.status(404)
					.json({ message: "Review not found" });
			}
			if (
				review.user.toString() !== req.user.id &&
				req.user.role !== "admin"
			) {
				return res
					.status(403)
					.json({ message: "Not allowed" });
			}

			await reviewService.delete(req.params.id);

			const avgRating =
				await reviewService.calculateAverageRating(
					review.product
				);
			await productService.update(review.product, {
				rating: avgRating,
			});

			res.status(204).end();
		} catch (err) {
			next(err);
		}
	},
};
