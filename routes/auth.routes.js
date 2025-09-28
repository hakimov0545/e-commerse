import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { body } from "express-validator";
import {
	authMiddleware,
	adminMiddleware,
} from "../middlewares/auth.middleware.js";
import { validateMiddleware } from "../middlewares/validation.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Ro‘yxatdan o‘tish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
router.post(
	"/register",
	[
		body("name").notEmpty().withMessage("Name is required"),
		body("lastname")
			.notEmpty()
			.withMessage("Lastname is required"),
		body("email").isEmail().withMessage("Invalid email"),
		body("password")
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters"),
	],
	validateMiddleware,
	AuthController.register
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login qilish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post(
	"/login",
	[
		body("email").isEmail().withMessage("Invalid email"),
		body("password")
			.notEmpty()
			.withMessage("Password is required"),
	],
	validateMiddleware,
	AuthController.login
);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout qilish
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", AuthController.logout);

/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Token yangilash
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: New tokens returned
 */
router.get("/refresh", AuthController.refresh);

export default router;
