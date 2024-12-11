import { NextFunction, Request, Response } from "express";
import { fetchCryptoNews } from "../services/NewsService";

export class NewsController {
  static async getNews(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req.query;
      const news = await fetchCryptoNews((query as string) || "cryptocurrency");
      res.status(200).json(news);
    } catch (error) {
      next(error);
    }
  }
}
