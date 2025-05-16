import { Request, Response, NextFunction } from "express";
import { Portfolio } from "../models/portfolioModel";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
}

export const getPortfolio = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.user?._id });
    res.status(200).json(portfolio);
  } catch (err) {
    next(err);
  }
};

export const addPortfolioItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { coinId, amount, buyPrice, note } = req.body;

    const item = await Portfolio.create({
      userId: req.user?._id,
      coinId,
      amount,
      buyPrice,
      note,
    });

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updatePortfolioItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { amount, buyPrice, note } = req.body;

    const updated = await Portfolio.findOneAndUpdate(
      { _id: id, userId: req.user?._id },
      { amount, buyPrice, note },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deletePortfolioItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deleted = await Portfolio.findOneAndDelete({
      _id: id,
      userId: req.user?._id,
    });

    if (!deleted) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    next(err);
  }
};

// import { Request, Response } from "express";
// import Portfolio from "../models/portfolioModel";
// import mongoose from "mongoose";
// import { AuthenticatedRequest } from "../middlewares/auth";

// export const getPortfolio = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const portfolio = await Portfolio.find({ userId: req.user?._id });
//     res.status(200).json(portfolio);
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch portfolio", error: error.message });
//   }
// };

// export const addPortfolioItem = async (req: AuthenticatedRequest, res: Response) => {
//   const { coinId, amount, buyPrice, note } = req.body;

//   try {
//     const newItem = await Portfolio.create({
//       userId: req.user?._id,
//       coinId,
//       amount,
//       buyPrice,
//       note,
//     });

//     res.status(201).json(newItem);
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: "Failed to add item", error: error.message });
//   }
// };

// export const updatePortfolioItem = async (
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> => {
//   const { id } = req.params;
//   const { amount, buyPrice, note } = req.body;

//   try {
//     const updated = await Portfolio.findOneAndUpdate(
//       { _id: id, userId: req.user?._id },
//       { amount, buyPrice, note },
//       { new: true }
//     );

//     if (!updated) {
//       res.status(404).json({ message: "Item not found" });
//       return;
//     }

//     res.status(200).json(updated);
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: "Failed to update item", error: error.message });
//   }
// };

// export const deletePortfolioItem = async (
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<any> => {
//   const { id } = req.params;

//   try {
//     const deleted = await Portfolio.findOneAndDelete({
//       _id: id,
//       userId: req.user?._id,
//     });

//     if (!deleted) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     return res.status(200).json({ message: "Deleted successfully" });
//   } catch (error: any) {
//     return res.status(500).json({
//       message: "Failed to delete item",
//       error: error.message,
//     });
//   }
// };
