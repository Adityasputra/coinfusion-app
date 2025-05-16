import { Router, Request, Response, NextFunction } from "express";
import { login, register } from "../controllers/AuthController";

const router = Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  register(req, res, next);
});
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  login(req, res, next);
});

export default router;
