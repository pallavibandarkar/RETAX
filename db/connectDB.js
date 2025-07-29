import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Url=process.env.MONGODB_URL;

const connectDB=async () => {
  try {
    await mongoose.connect(Url)
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

export default connectDB;