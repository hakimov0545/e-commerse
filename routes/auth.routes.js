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
 * /api/auth/register:
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
	AuthController.register,
);

/**
 * @swagger
 * /api/auth/login:
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
	AuthController.login,
);

/**
 * @swagger
 * /api/auth/logout:
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
 * /api/auth/refresh:
 *   post:
 *     summary: Token yangilash
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New tokens returned
 */
router.post("/refresh", AuthController.refresh);
router.get("/refresh", AuthController.refresh);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Parolni unutdingiz - Verification code yuborish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Verification code emailga yuborildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Email topilmadi yoki boshqa xato
 */
router.post("/forgot-password", AuthController.forgotPassword);

/**
 * @swagger
 * /api/auth/verify-code:
 *   post:
 *     summary: Verification code tekshirish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - verificationCode
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               verificationCode:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Verification code verified, reset token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 resetToken:
 *                   type: string
 *       400:
 *         description: Verification code expired yoki noto'g'ri
 */
router.post("/verify-code", AuthController.verifyCode);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Parolni yangilash (reset token kerak)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Parol muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error yoki code verified emas
 *       401:
 *         description: Unauthorized - reset token required
 */
router.post(
	"/reset-password",
	authMiddleware,
	AuthController.resetPassword,
);

export default router;
