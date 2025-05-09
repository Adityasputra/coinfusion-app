import { Request, Response, NextFunction } from "express";
import { fetchCryptocurrencies } from "../services/CoinGeckoService";

export class CryptoController {
  static async getCryptocurrencies(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { vs_currency = "usd", page = 1, per_page = 10 } = req.query;

      const cryptocurrencies = await fetchCryptocurrencies(
        vs_currency as string,
        parseInt(page as string),
        parseInt(per_page as string)
      );

      res.status(200).json(cryptocurrencies);
    } catch (error) {
      next(error);
    }
  }
}
