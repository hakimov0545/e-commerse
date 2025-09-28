import { Schema, model } from "mongoose";

const orderSchema = new Schema(
	{
		user: { type: Schema.ObjectId, ref: "User", required: true },
		products: [
			{
				product: {
					type: Schema.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true, min: 1 },
				price: { type: Number, required: true },
			},
		],
		totalAmount: { type: Number, required: true },
		status: {
			type: String,
			enum: ["pending", "shipped", "delivered", "cancelled"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

const orderModel = model("Order", orderSchema);

export default orderModel;
