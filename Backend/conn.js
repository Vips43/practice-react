import mongoose from "mongoose";

const mongoURL = "mongodb://127.0.0.1:27017/contactForm";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};

export default connectDB;
