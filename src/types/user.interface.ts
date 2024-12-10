import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUserScheme = Omit<IUser, "_id">;
