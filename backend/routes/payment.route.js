import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createCheckoutSession ,paymentCheckoutSuccess } from "../controllers/payment.controller.js";


const router = express.Router();

router.post("/create-checkout-session",protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, paymentCheckoutSuccess)

export default router;