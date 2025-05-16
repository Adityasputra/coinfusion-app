import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: mongoose.Types.ObjectId;
    email: string;
  };
}

interface JwtPayload {
  _id: string;
  iat?: number;
  exp?: number;
}

export const authentication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const payload = verifyToken(token) as JwtPayload;
    if (!payload || typeof payload !== "object" || !("_id" in payload)) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(payload._id).select("_id email");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      _id: user._id as mongoose.Types.ObjectId,
      email: user.email,
    };

    next();
  } catch (error: any) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
