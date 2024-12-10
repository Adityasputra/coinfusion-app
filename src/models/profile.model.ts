import { model, Schema } from "mongoose";
import { IProfileSchema } from "../types/profile.interface";

const profileSchema = new Schema<IProfileSchema>({
  name: { type: String, default: null },
  profilePicture: { type: String, default: null },
  address: { type: String, default: null },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Profile = model("Profile", profileSchema);
