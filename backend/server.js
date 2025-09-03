import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/order.route.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // remove trailing slash
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
  })
);

// Parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
