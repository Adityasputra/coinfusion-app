import { Router } from "express";
import { Controller } from "../controllers/NewsController";
export const router = Router();

router.get("/", Controller.getNews);
