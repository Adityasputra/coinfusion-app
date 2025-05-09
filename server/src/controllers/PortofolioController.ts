// import { Request, Response, NextFunction } from "express";
// import { Portofolio } from "../models/portofolio.model";
// import { Coin } from "../models/coin.model";
// import { IAddCoinRequest } from "../types/coin.interface";
// import { ObjectId } from "mongodb";

// interface AuthenticatedRequest extends Request {
//   user?: {
//     _id: ObjectId;
//   };
// }

// export class PortofolioController {
//   static async addCoinToPortfolio(
//     req: AuthenticatedRequest,
//     res: Response,
//     next: NextFunction
//   ) {
//     const session = await Portofolio.startSession();
//     session.startTransaction();
//     try {
//       const { user } = req;
//       if (!user || !user._id) {
//         throw {
//           name: "Unauthenticated",
//           message: "User must be logged in",
//         };
//       }

//       const { coinId, amount }: IAddCoinRequest = req.body;

//       if (!coinId || !amount) {
//         throw {
//           name: "InvalidData",
//           message: "Coin ID and amount are required",
//         };
//       }

//       let portofolio = await Portofolio.findOne({ userId: user._id });
//       if (!portofolio) {
//         portofolio = new Portofolio({ userId: user._id, coins: [] });
//       }

//       const existingCoin = portofolio.coins.find((coin) =>
//         coin.coinId === coinId
//       );

//       if (existingCoin) {
//         existingCoin.amount += amount;
//       } else {
//         const coinData = await Coin.findOne({ _id: coinId });
//         if (!coinData) {
//           throw { name: "NotFound", message: "Coin not found" };
//         }

//         // Tambahkan koin baru
//         portofolio.coins.push({
//           coinId: coinData._id.toString(),
//           name: coinData.name,
//           symbol: coinData.symbol,
//           amount,
//         });
//       }

//       // Simpan portofolio
//       await portofolio.save({ session });

//       await session.commitTransaction();
//       session.endSession();

//       res.status(200).json({
//         message: "Coin successfully added to portfolio",
//         portfolio: portofolio,
//       });
//     } catch (error) {
//         console.dir(error, { depth: null})
//       await session.abortTransaction();
//       session.endSession();
//       next(error);
//     }
//   }
// }


// in progress