import { Request, Response, Router } from "express";
export const router = Router();

import authRoutes from "./auth.routes";
import portfolioRoutes from "./portofolio.routes";
import coinRoutes from "./coin.routes";
import { errorHandler } from "../middlewares/errorHandler";

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running ..." });
});

router.use("/auth", authRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/coins", coinRoutes);

router.use(errorHandler);
router.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});
