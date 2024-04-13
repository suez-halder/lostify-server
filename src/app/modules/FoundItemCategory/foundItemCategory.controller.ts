import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "./../../../shared/catchAsync";
import { FoundItemCategoryService } from "./foundItemCategory.service";

const createFoundItemCategoryIntoDB = catchAsync(async (req, res) => {
    const result = await FoundItemCategoryService.createFoundItemCategoryIntoDB(
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Found item category created successfully",
        data: result,
    });
});

export const FoundItemCategoryController = {
    createFoundItemCategoryIntoDB,
};
