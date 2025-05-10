import { Router } from "express";
import {
  addPortfolioItem,
  deletePortfolioItem,
  getPortfolio,
  updatePortfolioItem,
} from "../controllers/PortofolioController";

export const router = Router();

router.get("/", getPortfolio);
router.post("/", addPortfolioItem);
router.put("/:id", updatePortfolioItem);
router.delete("/:id", deletePortfolioItem);