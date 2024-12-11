import { Router } from "express";
import { CryptoController } from "../controllers/CoinController";
export const router = Router();

router.get("/", CryptoController.getCryptocurrencies);
