import { config } from "dotenv";
import mongoose from "mongoose";

config();

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  if (!MONGO_URL) {
    console.error("DATABASE URL NOT GIVEN");
    process.exit(1);
  }
  
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conected to DB✅");
  } catch (error) {
    console.log("DB connection failed ❌", error);
  }
};
