import express from "express";
import { LoginController } from "./login.controller";

const router = express.Router();

router.post("/", LoginController.loginUser);

export const LoginRoutes = router;
