import { Request, Response, NextFunction } from "express";
import { startSession } from "mongoose";
import { User } from "../models/User";
import { transporter } from "../config/nodemailer";
import { hashPassword, comparePassword } from "../utils/bcryptjs";
import { signToken } from "../utils/jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await startSession();

  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, password: hashedPassword });

    await session.withTransaction(async () => {
      await newUser.validate();
      await newUser.save({ session });
    });

    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Welcome to CoinFusion App",
      text: "You have successfully registered to CoinFusion App. You can start trading now!",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    session.endSession();
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email) throw new Error("EmailRequiredError");
    if (!password) throw new Error("PasswordRequiredError");

    const findUser = await User.findOne({ email }).select("_id email password");
    if (!findUser) throw new Error("Unauthorized");
    if (!comparePassword(password, findUser.password))
      throw new Error("Unauthorized");

    const access_token = signToken({ _id: findUser._id as string });
    res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
};

// static async loginGoogle(req:Request, res: Response){
//   try {
//     const { google_token } = req.headers
//     const client = new OAuth2Client()
//     const ticket = await client.verifyIdToken({
//       idToken: google_token.
//       audience: process.env.GOOGLE_CLIENT_ID
//     })
//     const { email } = ticket.payload;
//     const [user, created] = await User.findOrCreate({
//     })
//   } catch (error) {
//   }
// }
