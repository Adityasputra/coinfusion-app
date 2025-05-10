import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jsonwebtoken";
import { User } from "../models/userModel";
import mongoose from "mongoose";

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: mongoose.Types.ObjectId;
  };
}

interface TokenPayload {
  _id: string;
  iat: number;
}

export const authentication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const payload = verifyToken(token) as TokenPayload;

    const user = await User.findById(payload._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { _id: user._id };
    next();
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
