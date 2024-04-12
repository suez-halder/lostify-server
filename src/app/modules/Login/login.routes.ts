import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { LoginController } from "./login.controller";
import { LoginValidation } from "./login.validation";

const router = express.Router();

router.post(
    "/",
    validateRequest(LoginValidation.userLoginValidationSchema),
    LoginController.loginUser
);

export const LoginRoutes = router;
