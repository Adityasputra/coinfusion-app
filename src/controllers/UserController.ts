import { NextFunction, Request, Response } from "express";
import { IUserSchema } from "../types/user.interface";
import { User } from "../models/user.model";
import { startSession } from "mongoose";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { Profile } from "../models/profile.model";
import { transporter } from "../config/nodemailer";
import { signToken } from "../utils/jsonwebtoken";

export default class Controller {
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
}
