import express from "express";
import { 
    getAllProducts,
    getFeaturedProducts, 
    createProduct, 
    deleteProduct,
    getRecommendedProducts,
    getProductByCategory,
    toggleFeaturedProduct
 } from "../controllers/product.controller.js";

import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute ,adminRoute, getAllProducts);
router.get("/featured" , getFeaturedProducts);
router.get("/category/:id", getProductByCategory)
router.get("/recommendations", getRecommendedProducts)
router.patch("/:id",protectRoute, adminRoute, toggleFeaturedProduct);
router.post("/", protectRoute, adminRoute , createProduct);
router.delete("/:id", protectRoute ,adminRoute, deleteProduct);

export default router;