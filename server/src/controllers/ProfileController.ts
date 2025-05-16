// import { NextFunction, Request, Response } from "express";
// import { ObjectId } from "mongodb";
// import { Profile } from "../models/profileModel";
// import { startSession } from "mongoose";
// import cloudinary from "../utils/cloudinary";

// interface AuthenticatedRequest extends Request {
//   user?: {
//     _id: ObjectId;
//   };
//   file?: Express.Multer.File;
// }

// export class ProfileController {
//   static async getProfile(
//     req: AuthenticatedRequest,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const { user } = req;
//       const data = await Profile.aggregate([
//         {
//           $match: { userId: user?._id },
//         },
//         {
//           $lookup: {
//             from: "users",
//             localField: "userId",
//             foreignField: "_id",
//             as: "userData",
//           },
//         },
//         {
//           $unwind: {
//             path: "$userData",
//             preserveNullAndEmptyArrays: true,
//           },
//         },
//         {
//           $project: {
//             "userData.password": 0,
//             "userData.sensitiveField": 0,
//           },
//         },
//       ]);

//       res.status(200).json(data[0]);
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       next(error);
//     }
//   }

//   static async updateProfile(
//     req: AuthenticatedRequest,
//     res: Response,
//     next: NextFunction
//   ) {
//     const session = await startSession();
//     try {
//       const { name, address } = req.body;
//       const { user } = req;

//       if (!user || !user._id) throw { name: "Unauthenticated" };

//       const profile = await Profile.findOne({ userId: user._id });
//       if (!profile) throw { name: "NotFound" };

//       await session.withTransaction(async () => {
//         if (req.file) {
//           const b64File = Buffer.from(req.file.buffer).toString("base64");
//           const dataURI = `data:${req.file.mimetype};base64,${b64File}`;

//           const uploadResult = await cloudinary.uploader.upload(dataURI, {
//             folder: "delizioso-profile",
//           });

//           profile.profilePicture = uploadResult.secure_url;
//         }

//         if (name) profile.name = name;
//         if (address) profile.address = address;

//         await profile.save({ session });
//       });

//       const response = {
//         message: "Profile updated successfully",
//         profile: profile.toObject(),
//       };

//       res.status(200).json(response);
//     } catch (error) {
//       next(error);
//     } finally {
//       session.endSession();
//     }
//   }
// }
