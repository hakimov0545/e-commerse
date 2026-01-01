import reviewService from "../services/review.service.js";
import productService from "../services/product.service.js";

export const reviewController = {
	async create(req, res, next) {
		try {
			const { product, rating, comment } = req.body;

			// Product mavjudligini tekshirish
			const productExists = await productService.getById(
				product
			);
			if (!productExists) {
				return res.status(404).json({
					message: "Product not found",
				});
			}

			// Foydalanuvchi allaqachon review yozganmi tekshirish
			const existing = await reviewService.getByUserAndProduct(
				req.user.id,
				product
			);
			if (existing) {
				return res.status(400).json({
					message: "You already reviewed this product",
				});
			}

			const review = await reviewService.create({
				user: req.user.id,
				product,
				rating,
				comment,
			});

			// Product ratingni hisoblash
			const avgRating =
				await reviewService.calculateAverageRating(product);

			// Product reviews arrayiga yangi review ID qo'shish va ratingni yangilash
			await productService.update(product, {
				$push: { reviews: review._id },
				rating: avgRating,
			});

			// Populate qilib qaytarish
			const populatedReview = await reviewService.getById(
				review._id.toString()
			);

			res.status(201).json(populatedReview);
		} catch (err) {
			// Mongoose unique constraint error
			if (err.code === 11000) {
				return res.status(400).json({
					message: "You already reviewed this product",
				});
			}
			next(err);
		}
	},

	async getByProduct(req, res, next) {
		try {
			const { productId } = req.params;

			// Product mavjudligini tekshirish
			const product = await productService.getById(productId);
			if (!product) {
				return res.status(404).json({
					message: "Product not found",
				});
			}

			const reviews = await reviewService.getByProduct(
				productId
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
				return res.status(404).json({
					message: "Review not found",
				});
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
				return res.status(404).json({
					message: "Review not found",
				});
			}

			// Faqat review egasi o'zgartirishi mumkin
			if (review.user.toString() !== req.user.id) {
				return res.status(403).json({
					message:
						"Not allowed. You can only update your own reviews",
				});
			}

			// Faqat rating va comment yangilanishi mumkin
			const { rating, comment } = req.body;
			const updateData = {};
			if (rating !== undefined) updateData.rating = rating;
			if (comment !== undefined) updateData.comment = comment;

			if (Object.keys(updateData).length === 0) {
				return res.status(400).json({
					message: "No valid fields to update",
				});
			}

			const updated = await reviewService.update(
				req.params.id,
				updateData
			);

			// Product ratingni yangilash
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
				return res.status(404).json({
					message: "Review not found",
				});
			}

			// Faqat review egasi yoki admin o'chirishi mumkin
			if (
				review.user.toString() !== req.user.id &&
				req.user.role !== "admin"
			) {
				return res.status(403).json({
					message:
						"Not allowed. You can only delete your own reviews",
				});
			}

			const productId = review.product;
			const reviewId = review._id;

			await reviewService.delete(req.params.id);

			// Product ratingni hisoblash
			const avgRating =
				await reviewService.calculateAverageRating(productId);

			// Product reviews arrayidan review ID ni olib tashlash va ratingni yangilash
			await productService.update(productId, {
				$pull: { reviews: reviewId },
				rating: avgRating,
			});

			res.status(204).end();
		} catch (err) {
			next(err);
		}
	},

	async getAll(req, res, next) {
		try {
			const reviews = await reviewService.getAllPopulated();
			res.json(reviews);
		} catch (err) {
			next(err);
		}
	},
};
