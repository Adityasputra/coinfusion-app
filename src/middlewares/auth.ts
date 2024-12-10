import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jsonwebtoken";
import { User } from "../models/user.model";
import { ObjectId } from "mongodb";

export const authentication = async (
  req: Request & { user: { _id: ObjectId } },
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new Error("Unauthenticated");

    const [type, token] = auth.split(" ");
    if (!type || type !== "Bearer") throw new Error("Unauthenticated");

    if (!token) throw new Error("Unauthenticated");

    const payload = verifyToken(token) as { _id: string; iat: number };
    const findUser = await User.findById(new ObjectId(payload._id));

    if (!findUser) throw new Error("Unauthenticated");

    req.user = {
      _id: findUser._id,
    };

    next();
  } catch (error) {
    next(error);
  }
};
