import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../Register/register.constant";
import { MyProfileController } from "./myProfile.controller";

const router = express.Router();

router.get("/", auth(UserRole.USER), MyProfileController.getMyProfileFromDB);
router.put("/", auth(UserRole.USER), MyProfileController.updateMyProfileIntoDB);

export const MyProfileRoutes = router;
