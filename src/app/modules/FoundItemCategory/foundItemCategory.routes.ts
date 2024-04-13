import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FoundItemCategoryController } from "./foundItemCategory.controller";
import { FoundItemCategoryValidation } from "./foundItemCategory.validation";

const router = express.Router();

router.post(
    "/",
    validateRequest(
        FoundItemCategoryValidation.createFoundItemCategoryValidationSchema
    ),
    FoundItemCategoryController.createFoundItemCategoryIntoDB
);

export const FoundItemCategoryRoutes = router;
