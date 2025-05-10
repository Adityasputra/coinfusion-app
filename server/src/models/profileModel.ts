import { model, Schema } from "mongoose";

const profileSchema = new Schema({
  name: { type: String, default: null },
  profilePicture: { type: String, default: null },
  address: { type: String, default: null },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

profileSchema.pre("save", function (next) {
  const profile = this as any;

  profile.updatedAt = Date.now();

  next();
});

export const Profile = model("Profile", profileSchema);
