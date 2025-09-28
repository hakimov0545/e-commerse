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
				{ new: true }
			)
			.populate("wishlist");
	}

	// 🟢 Wishlistdan mahsulot o‘chirish
	async removeFromWishlist(userId, productId) {
		return await this.model
			.findByIdAndUpdate(
				userId,
				{ $pull: { wishlist: productId } },
				{ new: true }
			)
			.populate("wishlist");
	}

	// 🟢 Foydalanuvchi buyurtmalarini olish
	async getOrders(userId) {
		return await this.model.findById(userId).populate("orders");
	}
}

export default new UserService();
