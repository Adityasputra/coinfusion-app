import { model, Schema } from "mongoose";
import { IUserSchema } from "../types/user.interface";

const userSchema = new Schema<IUserSchema>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.set("validateBeforeSave", true);

export const User = model("User", userSchema);
