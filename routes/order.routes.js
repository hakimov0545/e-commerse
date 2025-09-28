import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";
import {
	authMiddleware,
	adminMiddleware,
} from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management endpoints
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order (only logged-in user)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: 64a1b3c5d8e9f0a123456789
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/orders/my:
 *   get:
 *     summary: Get logged-in user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *                 example: shipped
 *     responses:
 *       200:
 *         description: Order status updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - user
 *         - products
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the order
 *         user:
 *           type: string
 *           description: User ID
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID
 *               quantity:
 *                 type: number
 *         status:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *           default: pending
 *         address:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 64a1b3c5d8e9f0a123456789
 *         user: 64a1b3c5d8e9f0a987654321
 *         products:
 *           - product: 64a1b3c5d8e9f0a555555555
 *             quantity: 2
 *         status: pending
 *         address: "123 Street, Tashkent"
 *         createdAt: 2025-09-28T12:34:56.000Z
 *         updatedAt: 2025-09-28T12:34:56.000Z
 */

// ✅ Buyurtma yaratish (faqat login bo‘lgan user)
router.post("/", authMiddleware, orderController.create);

// ✅ Foydalanuvchining barcha buyurtmalari
router.get("/my", authMiddleware, orderController.getByUser);

// ✅ Barcha buyurtmalar (faqat admin)
router.get(
	"/",
	authMiddleware,
	adminMiddleware,
	orderController.getAll
);

// ✅ Buyurtma statusini yangilash (faqat admin)
router.put(
	"/:id/status",
	authMiddleware,
	adminMiddleware,
	orderController.updateStatus
);

export default router;
