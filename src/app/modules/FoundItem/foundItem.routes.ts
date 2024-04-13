import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "../Register/register.constant";
import { FoundItemController } from "./foundItem.controller";
import { FoundItemValidation } from "./foundItem.validation";

const router = express.Router();

router.get("/", FoundItemController.getAllFoundItemsFromDB);

router.post(
    "/",
    auth(UserRole.USER),
    validateRequest(FoundItemValidation.createFoundItemValidationSchema),
    FoundItemController.createFoundItemIntoDB
);

export const FoundItemRoutes = router;
