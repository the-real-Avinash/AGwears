import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "ecommerce",
    });

    isConnected = true;
    console.log("✅ Connected to Local MongoDB");
  } catch (error) {
    console.error("❌ Local MongoDB connection error:", error);
    process.exit(1);
  }
};
