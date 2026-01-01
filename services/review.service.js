import BaseService from "./base.service.js";
import Review from "../models/review.model.js";

class ReviewService extends BaseService {
	constructor() {
		super(Review);
	}

	// Mahsulot bo'yicha barcha reviewlar (yangi reviewlar birinchi)
	async getByProduct(productId) {
		return this.model
			.find({ product: productId })
			.populate("user", "name lastname")
			.sort({ createdAt: -1 });
	}

	// Foydalanuvchining bitta mahsulotga yozgan reviewini topish
	async getByUserAndProduct(userId, product) {
		return this.model.findOne({
			user: userId,
			product,
		});
	}

	// Reytingni o'rtacha hisoblash
	async calculateAverageRating(productId) {
		const reviews = await this.model.find({ product: productId });
		if (reviews.length === 0) return 0;

		const totalRating = reviews.reduce(
			(sum, r) => sum + r.rating,
			0
		);
		const avg = totalRating / reviews.length;

		// 1 xona kasr bilan yaxlitlash
		return Math.round(avg * 10) / 10;
	}

	// Review ID bo'yicha populate qilingan review olish
	async getById(id) {
		return this.model
			.findById(id)
			.populate("user", "name lastname")
			.populate("product", "name");
	}

	// Barcha reviewlarni populate qilib olish (admin uchun)
	async getAllPopulated() {
		return this.model
			.find()
			.populate("user", "name lastname")
			.populate("product", "name")
			.sort({ createdAt: -1 });
	}
}

export default new ReviewService();
