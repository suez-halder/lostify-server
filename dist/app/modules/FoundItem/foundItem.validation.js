"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundItemValidation = void 0;
const zod_1 = require("zod");
const createFoundItemValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        categoryId: zod_1.z.string({
            required_error: "Category ID is required",
        }),
        foundItemName: zod_1.z.string({
            required_error: "Found item name is required",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
        location: zod_1.z.string({
            required_error: "Location is required",
        }),
    }),
});
exports.FoundItemValidation = {
    createFoundItemValidationSchema,
};
