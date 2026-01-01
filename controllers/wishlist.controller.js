import userService from "../services/user.service.js";
import productService from "../services/product.service.js";

export const wishlistController = {
	async getWishlist(req, res, next) {
		try {
			const user = await userService.getById(req.user.id);
			if (!user) {
				return res.status(404).json({
					message: "User not found",
				});
			}

			// Wishlistni populate qilib olish
			const populatedUser = await userService.model
				.findById(req.user.id)
				.populate({
					path: "wishlist",
					populate: {
						path: "category",
						select: "name",
					},
				})
				.select("wishlist");

			res.json(populatedUser.wishlist || []);
		} catch (err) {
			next(err);
		}
	},

	async addToWishlist(req, res, next) {
		try {
			const { productId } = req.params;

			// Product mavjudligini tekshirish
			const product = await productService.getById(productId);
			if (!product) {
				return res.status(404).json({
					message: "Product not found",
				});
			}

			// User mavjudligini tekshirish
			const user = await userService.getById(req.user.id);
			if (!user) {
				return res.status(404).json({
					message: "User not found",
				});
			}

			// Agar wishlistda allaqachon bo'lsa
			const productIdString = productId.toString();
			const isInWishlist = user.wishlist.some(
				(id) => id.toString() === productIdString
			);

			if (isInWishlist) {
				return res.status(400).json({
					message: "Product already in wishlist",
				});
			}

			// Wishlistga qo'shish
			const updatedUser = await userService.addToWishlist(
				req.user.id,
				productId
			);

			// Populate qilib qaytarish
			const populatedUser = await userService.model
				.findById(req.user.id)
				.populate({
					path: "wishlist",
					populate: {
						path: "category",
						select: "name",
					},
				})
				.select("wishlist");

			res.status(201).json({
				message: "Product added to wishlist",
				wishlist: populatedUser.wishlist,
			});
		} catch (err) {
			next(err);
		}
	},

	async removeFromWishlist(req, res, next) {
		try {
			const { productId } = req.params;

			// User mavjudligini tekshirish
			const user = await userService.getById(req.user.id);
			if (!user) {
				return res.status(404).json({
					message: "User not found",
				});
			}

			// Product wishlistda borligini tekshirish
			const productIdString = productId.toString();
			const isInWishlist = user.wishlist.some(
				(id) => id.toString() === productIdString
			);

			if (!isInWishlist) {
				return res.status(404).json({
					message: "Product not in wishlist",
				});
			}

			// Wishlistdan olib tashlash
			const updatedUser = await userService.removeFromWishlist(
				req.user.id,
				productId
			);

			// Populate qilib qaytarish
			const populatedUser = await userService.model
				.findById(req.user.id)
				.populate({
					path: "wishlist",
					populate: {
						path: "category",
						select: "name",
					},
				})
				.select("wishlist");

			res.json({
				message: "Product removed from wishlist",
				wishlist: populatedUser.wishlist,
			});
		} catch (err) {
			next(err);
		}
	},

	async clearWishlist(req, res, next) {
		try {
			// User mavjudligini tekshirish
			const user = await userService.getById(req.user.id);
			if (!user) {
				return res.status(404).json({
					message: "User not found",
				});
			}

			// Wishlistni tozalash
			await userService.model.findByIdAndUpdate(req.user.id, {
				$set: { wishlist: [] },
			});

			res.json({
				message: "Wishlist cleared successfully",
				wishlist: [],
			});
		} catch (err) {
			next(err);
		}
	},
};
