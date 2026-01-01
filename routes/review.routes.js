import { Router } from "express";
import { body, param } from "express-validator";
import { reviewController } from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateMiddleware } from "../middlewares/validation.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Product reviews management
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews (Admin only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all reviews
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Add a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - rating
 *               - comment
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, reviewController.getAll);

router.post(
	"/",
	authMiddleware,
	[
		body("product")
			.notEmpty()
			.withMessage("Product ID is required")
			.isMongoId()
			.withMessage("Invalid product ID"),
		body("rating")
			.notEmpty()
			.withMessage("Rating is required")
			.isInt({ min: 1, max: 5 })
			.withMessage("Rating must be an integer between 1 and 5"),
		body("comment")
			.notEmpty()
			.withMessage("Comment is required")
			.trim()
			.isLength({ min: 1, max: 1000 })
			.withMessage(
				"Comment must be between 1 and 1000 characters"
			),
	],
	validateMiddleware,
	reviewController.create
);

/**
 * @swagger
 * /api/reviews/product/{productId}:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of reviews for the product
 *       404:
 *         description: Product not found
 */
router.get(
	"/product/:productId",
	[
		param("productId")
			.notEmpty()
			.withMessage("Product ID is required")
			.isMongoId()
			.withMessage("Invalid product ID"),
	],
	validateMiddleware,
	reviewController.getByProduct
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review found
 *       404:
 *         description: Review not found
 */
router.get(
	"/:id",
	[
		param("id")
			.notEmpty()
			.withMessage("Review ID is required")
			.isMongoId()
			.withMessage("Invalid review ID"),
	],
	validateMiddleware,
	reviewController.getById
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update review (only owner can update)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */
router.put(
	"/:id",
	authMiddleware,
	[
		param("id")
			.notEmpty()
			.withMessage("Review ID is required")
			.isMongoId()
			.withMessage("Invalid review ID"),
		body("rating")
			.optional()
			.isInt({ min: 1, max: 5 })
			.withMessage("Rating must be an integer between 1 and 5"),
		body("comment")
			.optional()
			.trim()
			.isLength({ min: 1, max: 1000 })
			.withMessage(
				"Comment must be between 1 and 1000 characters"
			),
	],
	validateMiddleware,
	reviewController.update
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete review (only owner or admin can delete)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */
router.delete(
	"/:id",
	authMiddleware,
	[
		param("id")
			.notEmpty()
			.withMessage("Review ID is required")
			.isMongoId()
			.withMessage("Invalid review ID"),
	],
	validateMiddleware,
	reviewController.delete
);

export default router;
