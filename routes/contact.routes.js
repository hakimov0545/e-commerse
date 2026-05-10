import express from "express";
import contactController from "../controllers/contact.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact endpoints
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Barcha kontaktlarni olish
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: Kontaktlar ro‘yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   message:
 *                     type: string
 *       500:
 *         description: Server xatosi
 */
router.get("/", contactController.getAll);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Yangi kontakt yaratish
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kontakt muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Server xatosi
 */
router.post("/", contactController.create);

export default router;
