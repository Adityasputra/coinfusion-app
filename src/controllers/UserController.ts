import { NextFunction, Request, Response } from "express";
import { IUserSchema } from "../types/user.interface";
import { User } from "../models/user.model";

export default class Controller {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: IUserSchema = req.body;
      const newUser = new User({
        email,
        password,
      });

      
    } catch (error) {}
  }
}
