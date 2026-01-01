import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
	{
		product: {
			type: Schema.ObjectId,
			ref: "Product",
			required: true,
			index: true,
		},
		user: {
			type: Schema.ObjectId,
			ref: "User",
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
			validate: {
				validator: Number.isInteger,
				message: "Rating must be an integer between 1 and 5",
			},
		},
		comment: {
			type: String,
			required: true,
			trim: true,
			minLength: [1, "Comment cannot be empty"],
			maxLength: [
				1000,
				"Comment cannot exceed 1000 characters",
			],
		},
	},
	{
		timestamps: true,
	}
);

// Compound unique index: bir foydalanuvchi bir mahsulotga faqat bitta review yozishi mumkin
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Product bo'yicha tez qidirish uchun index (allaqachon product fieldda index bor, lekin aniqroq)
reviewSchema.index({ product: 1, createdAt: -1 });

const reviewModel = model("Review", reviewSchema);

export default reviewModel;
