import express, { json } from "express";
import dotnev from "dotenv";
import authRoutes from "./routes/auth.route.js"
import { connectDatabase } from "./lib/db.js";
dotnev.config();
    
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());    //request the client UI side get for information

app.use("/api/auth", authRoutes)

app.listen(PORT ,()=>{
    console.log(`Server is running on port: http://localhost:${PORT}`)
    connectDatabase();
})  

