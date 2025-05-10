import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coinId: { type: String, required: true },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be a positive number"],
    },
    buyPrice: {
      type: Number,
      required: true,
      min: [0, "Buy price must be a positive number"],
    },
    note: { type: String, default: null },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;
