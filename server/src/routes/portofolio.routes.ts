import { authentication } from "../middlewares/auth";
import { Router, Request, Response, NextFunction } from "express";

import {
  addPortfolioItem,
  deletePortfolioItem,
  getPortfolio,
  updatePortfolioItem,
} from "../controllers/PortofolioController";

const router = Router();

function asyncHandler(fn: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.use(asyncHandler(authentication));

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  getPortfolio(req, res, next);
});
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  addPortfolioItem(req, res, next);
});
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  updatePortfolioItem(req, res, next);
});
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  deletePortfolioItem(req, res, next);
});

export default router;
