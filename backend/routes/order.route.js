import express from "express";
import { createOrder, deleteOrder, getOrders, getOrdersByUser, getUserOrders, updateOrderStatus } from "../controller/order.controller.js";


const router = express.Router();

router.post("/order", createOrder);
router.get("/order", getOrders);
router.get("/order/user/:id", getUserOrders);
router.put("/order/:id/status", updateOrderStatus);
router.delete("/order/:id", deleteOrder);
router.get("/user-order/:userid", getOrdersByUser);

export default router;
