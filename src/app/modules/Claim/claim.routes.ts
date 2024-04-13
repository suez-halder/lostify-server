import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "../Register/register.constant";
import { ClaimController } from "./claim.controller";
import { ClaimValidation } from "./claim.validation";

const router = express.Router();

router.get("/", auth(UserRole.USER), ClaimController.getMyClaims);

router.post(
    "/",
    auth(UserRole.USER),
    validateRequest(ClaimValidation.createClaimValidationSchema),
    ClaimController.createClaimIntoDB
);

router.patch(
    "/:id",
    auth(UserRole.USER),
    validateRequest(ClaimValidation.updateClaimValidationSchema),
    ClaimController.updateClaimStatus
);

export const ClaimRoutes = router;
