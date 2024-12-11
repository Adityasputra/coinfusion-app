import { ObjectId } from "mongodb";

export interface Coin {
  _id: ObjectId;
  coinId: ObjectId;
  name: string;
  sysmbol: string;
  amount: number;
}

export type CoinSchema = Omit<Coin, "_id">;
