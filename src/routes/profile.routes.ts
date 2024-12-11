import { Router } from "express";
import { authentication } from "../middlewares/auth";
import { upload } from "../middlewares/multer";
import { Controller } from "../controllers/ProfileController";
export const router = Router();

router.patch("/", authentication, upload.single("image"), () => {});
router.get("/", authentication, Controller.getProfile);
