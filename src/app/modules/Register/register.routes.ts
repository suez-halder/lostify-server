import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RegisterController } from "./register.controller";
import { RegisterValidation } from "./register.validation";

const router = express.Router();

router.post(
    "/",
    validateRequest(RegisterValidation.registerUserValidationSchema),
    RegisterController.registerUser
);

export const RegisterRoutes = router;
