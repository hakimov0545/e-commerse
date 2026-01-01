import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

// 🔹 Routers
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import orderRouter from "./routes/order.routes.js";
import reviewRouter from "./routes/review.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import { swaggerDocs } from "./swagger.js";
import { logger } from "./middlewares/logger.middleware.js";

const app = express();

const PORT = process.env.PORT || 5050;
const DB_URL = process.env.DB_URL;

app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);
app.use(express.json());
app.use(cookieParser({}));
app.use(logger());
app.use(express.static("static"));
app.use("/uploads", express.static("uploads")); // 📸 /uploads prefix bilan serve qilish

// 🔹 Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/dashboard", dashboardRouter);

// 🔹 Error handler (oxirida bo‘lishi shart)
app.use(errorHandler);

swaggerDocs(app);

const bootstrap = async () => {
	try {
		await mongoose.connect(DB_URL);
		console.log("✅ Connected to MongoDB");

		app.listen(PORT, () => {
			console.log(
				`🚀 Server listening on: http://localhost:${PORT}`
			);
		});
	} catch (error) {
		console.log(`❌ Error connecting with DB: ${error}`);
	}
};

bootstrap();
