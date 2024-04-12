import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "./../../../shared/catchAsync";
import { LoginService } from "./login.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await LoginService.loginUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
});

export const LoginController = {
    loginUser,
};
