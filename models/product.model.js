import { Schema, model } from "mongoose";

const productSchema = new Schema(
	{
		name: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		price: { type: Number, required: true },
		description: { type: String },
		images: [{ type: String }],
		category: { type: Schema.ObjectId, ref: "Category" },
		reviews: [{ type: Schema.ObjectId, ref: "Review" }],
		rating: { type: Number, default: 0 },
		stock: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	}
);

const productModel = model("Product", productSchema);

export default productModel;
