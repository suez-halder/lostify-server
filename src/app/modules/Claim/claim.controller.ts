import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TAuthUser } from "../../interfaces/common";
import { ClaimService } from "./claim.service";

const createClaimIntoDB = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const result = await ClaimService.createClaimIntoDB(req.body, user);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Claim created successfully",
        data: result,
    });
});

export const ClaimController = {
    createClaimIntoDB,
};
