import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, getRecentProduct, updateProduct } from '../controller/poduct.controller.js';
import upload from '../middleware/multerconfig.js';

const router = express.Router();

router.post("/product", upload.single("image"), createProduct);
router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", upload.single("image"), updateProduct);
router.delete("/product/:id", deleteProduct);
router.get("/recent", getRecentProduct);

export default router;  