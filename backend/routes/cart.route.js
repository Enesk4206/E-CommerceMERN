import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addToCart,getCartProducts,RemoveAllFromCart,updateQuantity } from "../controllers/cart.controller.js";


const router = express.Router();

router.get("/",protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, RemoveAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

export default router;