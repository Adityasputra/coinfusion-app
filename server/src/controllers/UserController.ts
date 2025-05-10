import { NextFunction, Request, Response } from "express";
import { IUserSchema } from "../types/user.interface";
import { User } from "../models/userModel";
import { startSession } from "mongoose";
import { hashPassword, comparePassword } from "../utils/bcryptjs";
import { Profile } from "../models/profileModel";
import { transporter } from "../config/nodemailer";
import { signToken } from "../utils/jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";

export default class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const session = await startSession();

    try {
      const { email, password }: IUserSchema = req.body;
      if (!email) throw new Error("EmailRequiredError");
      if (!password) throw new Error("PasswordRequiredError");

      const newUser = new User({
        email,
        password,
      });

      await session.withTransaction(async () => {
        await newUser.validate();
        newUser.password = hashPassword(password);
        await newUser.save({ session });

        const newProfile = new Profile({
          userId: newUser._id,
        });
        await newProfile.save({ session });

        res.status(201).json({
          message: "User registered successfully",
          user: {
            id: newUser._id,
            email: newUser.email,
          },
        });

        const infoEmail = {
          from: "vaughn43@ethereal.email",
          to: email,
          subject: "Welcome to CoinFusion App",
          text: "You have successfully registered to CoinFusion App, you can start trading now!",
        };

        try {
          await transporter.sendMail(infoEmail);
          console.log("Email sent successfully");
        } catch (err) {
          console.error("Failed to send email:", err);
        }
      });
    } catch (error) {
      next(error);
    } finally {
      session.endSession();
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email) throw new Error("EmailRequiredError");
      if (!password) throw new Error("PasswordRequiredError");

      const findUser = await User.findOne({ email }).select(
        "_id email password"
      );
      if (!findUser) throw new Error("Unauthorized");

      if (!comparePassword(password, findUser.password))
        throw new Error("Unauthorized");

      const access_token = signToken({
        _id: `${findUser._id}`,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  // static async loginGoogle(req:Request, res: Response, next: NextFunction){
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
}
