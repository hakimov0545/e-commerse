import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
	{
		product: {
			type: Schema.ObjectId,
			ref: "Product",
			required: true,
		},
		user: { type: Schema.ObjectId, ref: "User", required: true },
		rating: { type: Number, required: true, min: 1, max: 5 },
		comment: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const reviewModel = model("Review", reviewSchema);

export default reviewModel;
