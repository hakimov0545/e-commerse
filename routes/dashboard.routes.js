import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";
import {
	authMiddleware,
	adminMiddleware,
} from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics and analytics
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get all dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [day, week, month, year]
 *         description: Period for revenue stats
 *     responses:
 *       200:
 *         description: Dashboard data
 *       401:
 *         description: Unauthorized
 */
router.get(
	"/",
	authMiddleware,
	adminMiddleware,
	dashboardController.getDashboardData
);

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get general statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: General statistics
 */
router.get(
	"/stats",
	authMiddleware,
	adminMiddleware,
	dashboardController.getStats
);

/**
 * @swagger
 * /api/dashboard/revenue:
 *   get:
 *     summary: Get revenue statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [day, week, month, year]
 *     responses:
 *       200:
 *         description: Revenue statistics
 */
router.get(
	"/revenue",
	authMiddleware,
	adminMiddleware,
	dashboardController.getRevenueStats
);

/**
 * @swagger
 * /api/dashboard/order-status:
 *   get:
 *     summary: Get order status statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order status statistics
 */
router.get(
	"/order-status",
	authMiddleware,
	adminMiddleware,
	dashboardController.getOrderStatusStats
);

/**
 * @swagger
 * /api/dashboard/revenue-by-date:
 *   get:
 *     summary: Get revenue by date (for charts)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Revenue by date data
 */
router.get(
	"/revenue-by-date",
	authMiddleware,
	adminMiddleware,
	dashboardController.getRevenueByDate
);

/**
 * @swagger
 * /api/dashboard/orders-by-date:
 *   get:
 *     summary: Get orders by date (for charts)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Orders by date data
 */
router.get(
	"/orders-by-date",
	authMiddleware,
	adminMiddleware,
	dashboardController.getOrdersByDate
);

/**
 * @swagger
 * /api/dashboard/top-products:
 *   get:
 *     summary: Get top selling products
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Top products
 */
router.get(
	"/top-products",
	authMiddleware,
	adminMiddleware,
	dashboardController.getTopProducts
);

/**
 * @swagger
 * /api/dashboard/recent-orders:
 *   get:
 *     summary: Get recent orders
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Recent orders
 */
router.get(
	"/recent-orders",
	authMiddleware,
	adminMiddleware,
	dashboardController.getRecentOrders
);

/**
 * @swagger
 * /api/dashboard/products-by-category:
 *   get:
 *     summary: Get products count by category
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products by category
 */
router.get(
	"/products-by-category",
	authMiddleware,
	adminMiddleware,
	dashboardController.getProductsByCategory
);

export default router;
