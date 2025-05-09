import { Request, Response, Router } from "express";
import Controller from "../controllers/UserController";
export const router = Router();

import { router as profileRouter } from "./profile.routes";
import { router as newsRouter } from "./news.routes";
import { router as coinRouter } from "./coin.routes";
import { router as chatbotRouter } from "./chatbot.routes";
// import { router as portofolioRouter } from "./portofolio.routes"; // in progress

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running ..." });
});

router.post("/login", Controller.login);
router.post("/register", Controller.register);
router.use("/profile", profileRouter);
router.use("/news", newsRouter);
router.use("/coins", coinRouter);
router.use("/chatbot", chatbotRouter);
// router.use("/portofolio", portofolioRouter); // in progress
