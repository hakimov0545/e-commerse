import BaseService from "./base.service.js";
import userModel from "../models/user.model.js";

class UserService extends BaseService {
	constructor() {
		super(userModel);
	}

	// 🟢 Email bo‘yicha foydalanuvchini olish
	async getByEmail(email) {
		return await this.model.findOne({ email });
	}

	// 🟢 Wishlistga mahsulot qo‘shish
	async addToWishlist(userId, productId) {
		return await this.model
			.findByIdAndUpdate(
				userId,
				{ $addToSet: { wishlist: productId } },
				{ new: true },
			)
			.populate("wishlist");
	}

	// 🟢 Wishlistdan mahsulot o‘chirish
	async removeFromWishlist(userId, productId) {
		return await this.model
			.findByIdAndUpdate(
				userId,
				{ $pull: { wishlist: productId } },
				{ new: true },
			)
			.populate("wishlist");
	}

	// 🟢 Foydalanuvchi buyurtmalarini olish
	async getOrders(userId) {
		return await this.model.findById(userId).populate("orders");
	}

	// 🟢 Parolni o'zgartirish
	async changePassword(userId, currentPassword, newPassword) {
		const bcrypt = await import("bcryptjs").then(
			(m) => m.default,
		);
		const { BaseError } = await import("../errors/base.error.js");

		const user = await this.model
			.findById(userId)
			.select("+password");

		if (!user) {
			throw BaseError.BadRequest("User not found");
		}

		// Hozirgi parolni tekshirish
		const isPassEquals = await bcrypt.compare(
			currentPassword,
			user.password,
		);

		if (!isPassEquals) {
			throw BaseError.BadRequest(
				"Current password is incorrect",
			);
		}

		// Yangi parolni hashlash
		const hashedNewPassword = await bcrypt.hash(newPassword, 10);

		// Parolni yangilash
		return await this.model.findByIdAndUpdate(
			userId,
			{ password: hashedNewPassword },
			{ new: true },
		);
	}
}

export default new UserService();
