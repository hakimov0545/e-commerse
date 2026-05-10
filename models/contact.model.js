import { model, Schema } from "mongoose";

const contactSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String },
		phone: { type: String, required: true },
		message: { type: String },
	},
	{
		timestamps: true,
	},
);

export default model("Contact", contactSchema);
