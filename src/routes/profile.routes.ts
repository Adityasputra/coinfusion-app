import { Router } from "express";
import { authentication } from "../middlewares/auth";
import { upload } from "../middlewares/multer";
export const router = Router();

router.patch("/profile", authentication, upload.single("image"), () => {});
router.get("/profile", authentication, () => {});
