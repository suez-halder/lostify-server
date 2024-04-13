import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { FoundItemService } from "./foundItem.service";
import { TAuthUser } from "../../interfaces/common";
import pick from "../../../shared/pick";
import { foundItemFilterableFields } from "./foundItem.constant";

const createFoundItemIntoDB = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;

    const result = await FoundItemService.createFoundItemIntoDB(req.body, user);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Found item category created successfully",
        data: result,
    });
});

const getAllFoundItemsFromDB = catchAsync(async (req, res) => {
    const filters = pick(req.query, foundItemFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await FoundItemService.getAllFoundItemsFromDB(
        filters,
        options
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Found items retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});

export const FoundItemController = {
    createFoundItemIntoDB,
    getAllFoundItemsFromDB,
};
