import { Request, Response, Router } from "express";
import Controller from "../controllers/UserController";
export const router = Router();

// import { router as profileRouter } from "./profileRoutes";
import { router as newsRouter } from "./newsRoutes";
import { router as chatbotRouter } from "./chatbotRoutes";
// import { router as portofolioRouter } from "./portofolioRoutes";

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running ..." });
});

router.post("/login", Controller.login);
router.post("/register", Controller.register);

// router.use("/profile", profileRouter);
router.use("/news", newsRouter);
router.use("/chatbot", chatbotRouter);
// router.use("/portofolio", portofolioRouter);

router.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});
