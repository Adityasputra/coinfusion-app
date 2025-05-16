import { Schema, model, Types } from "mongoose";

const portfolioSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    coinId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    buyPrice: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Portfolio = model("Portfolio", portfolioSchema);
