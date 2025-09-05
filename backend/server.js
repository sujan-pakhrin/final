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
import { verifyAdmin, verifyUser } from "./middleware/verifytoken.js";

dotenv.config();
connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
  })
);


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.get("/profile", verifyUser, (req, res) => {
  res.json({
    success: true,
    message: "User profile fetched successfully",
    user: req.user,
  });
});

app.get("/admin/dashboard", verifyAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin!",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
