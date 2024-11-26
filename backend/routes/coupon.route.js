import express from "express";
import {protectRoute} from "../middleware/auth.middleware.js";
import { getCoupon } from "../controllers/coupon.route.js";

const router = express.Router();

router.get("/",protectRoute, getCoupon);
router.get("/validate", protectRoute,validateCoupon);


export default router;