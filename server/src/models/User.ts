import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
