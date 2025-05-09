import { model, Schema } from "mongoose";
import { ICoinSchema } from "../types/coin.interface";

const coinSchema = new Schema<ICoinSchema>({
  coinId: { type: String, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  amount: { type: Number, required: true },
});

export const Coin = model("Coin", coinSchema);
