import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TAuthUser } from "../../interfaces/common";
import { MyProfileService } from "./myProfile.service";

const getMyProfileFromDB = catchAsync(async (req, res) => {
    console.log(req.user);
    const user = req.user as TAuthUser;

    const result = await MyProfileService.getMyProfileFromDB(user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile retrieved successfully",
        data: result,
    });
});
const updateMyProfileIntoDB = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const result = await MyProfileService.updateMyProfileIntoDB(req.body, user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile updated successfully",
        data: result,
    });
});

export const MyProfileController = {
    getMyProfileFromDB,
    updateMyProfileIntoDB,
};
