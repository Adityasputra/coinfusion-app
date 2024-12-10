import { Request, Response, Router } from "express";
import Controller from "../controllers/UserController";
export const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running ..." });
});

router.post("/login", Controller.login);
router.post("/register", Controller.register);
