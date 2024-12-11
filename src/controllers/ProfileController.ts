import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Profile } from "../models/profile.model";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: ObjectId;
  };
}

export class Controller {
  static async getProfile(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user } = req;
      const data = await Profile.aggregate([
        {
          $match: { userId: user?._id },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: {
            path: "$userData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            "userData.password": 0,
            "userData.sensitiveField": 0,
          },
        },
      ]);

      res.status(200).json(data[0]);
    } catch (error) {
      console.error("Error fetching profile:", error);
      next(error);
    }
  }
}
