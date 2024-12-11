import { ObjectId } from "mongodb";
import { ICoinSchema } from "./coin.interface";

export interface IPortofolio {
  _id: ObjectId;
  userId: ObjectId;
  coins: ICoinSchema[];
}

export type IPortofolioSchema = Omit<IPortofolio, "_id">;

export interface IPortfolioResponse {
  message: string;
  portfolio: IPortofolioSchema;
}
