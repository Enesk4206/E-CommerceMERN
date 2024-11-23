import { redis } from "../lib/redis.js";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
const generateTokens =(userId) =>{
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m",
        
    });

    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn:"7d",
    })
    return {accessToken, refreshToken};
};
const storeRefreshToken = async(userId,refreshToken) =>{
    await redis.set(`refresh_token:${userId}`, refreshToken , "EX" , 7 * 24 * 60 * 60);
};

const setCookies = (res, accessToken ,refreshToken) =>{
    res.cookie("accessToken" , accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==="production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==="production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
};
export const signup = async (req, res)=>{
    const {name , email ,password} = req.body;
    try {
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }
        const user = await User.create({
            email,
            name,
            password,
        });

        //redis authenticate
         const {accessToken, refreshToken}= generateTokens(user._id)
         await storeRefreshToken(user._id , refreshToken);

         setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            success:true,
            user,
            message:"User created successfully" 
        });
    } catch (error) {
        console.log("Error in Auth Controller")
        res.status(500).json({
            success: false,
            message:"Internal Server Error",
        })   
    }
};
export const login = (req, res)=>{
    try {
     
    } catch (error) {
        
    }
}
export const logout = (req, res)=>{
    try {
        
    } catch (error) {
        
    }
}