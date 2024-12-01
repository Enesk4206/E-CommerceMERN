import express, { json } from "express";
import dotnev from "dotenv";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js"
import coupenRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"
import analyticsRoutes from "./routes/analytics.route.js"

import { connectDatabase } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotnev.config();
    
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());    //request the client UI side get for information
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", coupenRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);


app.listen(PORT ,()=>{
    console.log(`Server is running on port: http://localhost:${PORT}`)
    connectDatabase();
})  

