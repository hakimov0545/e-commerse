import { Schema, model } from "mongoose";

const categorySchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		products: [{ type: Schema.ObjectId, ref: "Product" }],
	},
	{
		timestamps: true,
	}
);

const categoryModel = model("Category", categorySchema);

export default categoryModel;
