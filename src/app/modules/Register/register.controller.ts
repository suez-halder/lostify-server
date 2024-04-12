import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { RegisterService } from "./register.service";
import catchAsync from "./../../../shared/catchAsync";

const registerUser = catchAsync(async (req, res) => {
    const result = await RegisterService.registerUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});

export const RegisterController = {
    registerUser,
};
