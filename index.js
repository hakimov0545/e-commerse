import dotenv from "dotenv";
dotenv.config();

import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

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

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:4000",
  "http://127.0.0.1:4000",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  `http://localhost:${PORT}`,
  `http://127.0.0.1:${PORT}`,
  `http://localhost:5173`,
];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    const requestOrigin = origin || "(no origin)";

    if (!origin) {
      console.log(`CORS: accepting request with no origin`);
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log(`CORS: accepting origin ${requestOrigin}`);
      return callback(null, true);
    }

    console.warn(`CORS: rejecting origin ${requestOrigin}`);
    return callback(
      new Error(`CORS policy does not allow origin ${requestOrigin}`),
      false,
    );
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  exposedHeaders: ["Authorization", "X-Total-Count"],
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
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
      console.log(`🚀 Server listening on: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`❌ Error connecting with DB: ${error}`);
  }
};

bootstrap();
