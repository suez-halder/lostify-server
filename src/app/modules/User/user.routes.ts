import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
    "/",
    validateRequest(UserValidation.createUser),
    UserController.createUser
);

export const UserRoutes = router;
