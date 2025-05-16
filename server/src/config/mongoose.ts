import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI as string;
    if (!mongoUri) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env"
      );
    }

    await mongoose.connect(mongoUri, { dbName: "coinfusion" });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
