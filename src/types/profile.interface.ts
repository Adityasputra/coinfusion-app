import { ObjectId } from "mongodb";

export interface IProfile {
  _id: ObjectId;
  name?: string;
  profilePicture?: string;
  address?: string;
  userId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IProfileScheme = Omit<IProfile, "_id">;
