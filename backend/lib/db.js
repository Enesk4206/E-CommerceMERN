import mongoose from "mongoose";

export const connectDatabase = async () =>{
    try {
        const connectMongo = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Server connected MongoDB :${connectMongo.connection.host} `)
    } catch (error) {
        console.log("Server error",error.message);
        process.exit(1);
    }
}