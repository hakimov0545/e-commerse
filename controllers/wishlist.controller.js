import userService from "../services/user.service.js";
import productService from "../services/product.service.js";

export const wishlistController = {
	async getWishlist(req, res, next) {
		try {
			const user = await userService.getById(req.user.id);
			res.json(user.wishlist);
		} catch (err) {
			next(err);
		}
	},

	async addToWishlist(req, res, next) {
		try {
			const { productId } = req.params;

			// product mavjudligini tekshirish
			const product = await productService.getById(productId);
			if (!product) {
				return res
					.status(404)
					.json({ message: "Product not found" });
			}

			const user = await userService.getById(req.user.id);

			// agar wishlistda allaqachon bo‘lsa
			if (user.wishlist.includes(productId)) {
				return res
					.status(400)
					.json({ message: "Product already in wishlist" });
			}

			user.wishlist.push(productId);
			await user.save();

			res.status(201).json({
				message: "Product added to wishlist",
				wishlist: user.wishlist,
			});
		} catch (err) {
			next(err);
		}
	},

	async removeFromWishlist(req, res, next) {
		try {
			const { productId } = req.params;

			const user = await userService.getById(req.user.id);

			if (!user.wishlist.includes(productId)) {
				return res
					.status(404)
					.json({ message: "Product not in wishlist" });
			}

			user.wishlist = user.wishlist.filter(
				(id) => id.toString() !== productId
			);
			await user.save();

			res.json({
				message: "Product removed from wishlist",
				wishlist: user.wishlist,
			});
		} catch (err) {
			next(err);
		}
	},
};
