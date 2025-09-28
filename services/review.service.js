import BaseService from "./base.service.js";
import Review from "../models/review.model.js";

class ReviewService extends BaseService {
	constructor() {
		super(Review);
	}

	// Mahsulot bo‘yicha barcha reviewlar
	async getByProduct(productId) {
		return this.model
			.find({ product: productId })
			.populate("user", "name");
	}

	// Foydalanuvchining bitta mahsulotga yozgan reviewini topish
	async getByUserAndProduct(userId, productId) {
		return this.model.findOne({
			user: userId,
			product: productId,
		});
	}

	// Reytingni o‘rtacha hisoblash
	async calculateAverageRating(productId) {
		const reviews = await this.model.find({ product: productId });
		if (reviews.length === 0) return 0;

		const avg =
			reviews.reduce((sum, r) => sum + r.rating, 0) /
			reviews.length;

		return Math.round(avg * 10) / 10;
	}
}

export default new ReviewService();
