import express from "express";
import dotnev from "dotenv";
import authRoutes from "./routes/auth.route.js"
dotnev.config();
    
const app = express();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes)

app.listen(PORT ,()=>{
    console.log(`Server is running on port: http://localhost:${PORT}`)
})  

//NUuF8dEi27y9J2AW