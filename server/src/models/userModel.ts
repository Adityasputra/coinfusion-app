// import { model, Schema } from "mongoose";

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
//     lowercase: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: [6, "Password must be at least 6 characters!"],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// userSchema.pre("save", async function (next) {
//   const user = this as any;

//   if (user.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//   }

//   user.updatedAt = Date.now();

//   next();
// });

// userSchema.set("validateBeforeSave", true);

// export const User = model("User", userSchema);
