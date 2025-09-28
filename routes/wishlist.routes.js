import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { wishlistController } from "../controllers/wishlist.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: User wishlist management
 */

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products in wishlist
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, wishlistController.getWishlist);

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       201:
 *         description: Product added to wishlist
 *       400:
 *         description: Already in wishlist
 *       401:
 *         description: Unauthorized
 */
router.post(
	"/:productId",
	authMiddleware,
	wishlistController.addToWishlist
);

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in wishlist
 */
router.delete(
	"/:productId",
	authMiddleware,
	wishlistController.removeFromWishlist
);

export default router;
