import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

export const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {dbName: "coinfusion_db"});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(
      "Error connecting to MongoDB",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
};
