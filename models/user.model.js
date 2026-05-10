import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		address: { type: String },
		phone: { type: String },
		wishlist: [{ type: Schema.ObjectId, ref: "Product" }],
		orders: [{ type: Schema.ObjectId, ref: "Order" }],
		verificationCode: { type: String, select: false },
		verificationCodeExpiry: { type: Date, select: false },
		codeVerified: {
			type: Boolean,
			default: false,
			select: false,
		},
	},
	{
		timestamps: true,
	},
);

const userModel = model("User", userSchema);

export default userModel;
