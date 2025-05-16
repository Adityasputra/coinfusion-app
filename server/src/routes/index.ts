import { Request, Response, Router } from "express";
export const router = Router();

import authRoutes from "./auth.routes";

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running ..." });
});

router.use("/auth", authRoutes);

router.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});
