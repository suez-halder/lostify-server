import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "../Register/register.constant";
import { FoundItemCategoryController } from "./foundItemCategory.controller";
import { FoundItemCategoryValidation } from "./foundItemCategory.validation";

const router = express.Router();

router.post(
    "/",
    auth(UserRole.USER),
    validateRequest(
        FoundItemCategoryValidation.createFoundItemCategoryValidationSchema
    ),
    FoundItemCategoryController.createFoundItemCategoryIntoDB
);

export const FoundItemCategoryRoutes = router;
