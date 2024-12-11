import { Router } from "express";
import { authentication } from "../middlewares/auth";
import { upload } from "../middlewares/multer";
import { ProfileController } from "../controllers/ProfileController";
export const router = Router();

router.patch(
  "/",
  authentication,
  upload.single("image"),
  ProfileController.updateProfile
);
router.get("/", authentication, ProfileController.getProfile);
