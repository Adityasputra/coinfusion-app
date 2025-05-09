import { model, Schema } from "mongoose";
import { IPortofolioSchema } from "../types/portofolio.interface";

const portofolioSchema = new Schema<IPortofolioSchema>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  coins: {
    type: [
      new Schema({
        coinId: { type: String, required: true },
        name: { type: String, required: true },
        symbol: { type: String, required: true },
        amount: { type: Number, required: true },
      }),
    ],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Portofolio = model("Portofolio", portofolioSchema);
