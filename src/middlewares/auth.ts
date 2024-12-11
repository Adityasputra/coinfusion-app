import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jsonwebtoken";
import { User } from "../models/user.model";
import { ObjectId } from "mongodb";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: ObjectId;
  };
}

export const authentication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("Unauthenticated");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Unauthenticated");
    }

    let payload;
    try {
      payload = verifyToken(token) as { _id: string; iat: number };
    } catch (error) {
      throw new Error("Invalid token");
    }

    const findUser = await User.findById(payload._id);
    if (!findUser) {
      throw new Error("Unauthenticated");
    }

    req.user = { _id: findUser._id };
    next();
  } catch (error) {
    next(error);
  }
};
