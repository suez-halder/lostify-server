"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorDetails = err.issues.map((issue) => ({
        field: issue.path[issue.path.length - 1].toString(),
        message: issue.message,
    }));
    return {
        statusCode: 400,
        message: errorDetails.map((issue) => issue.message),
        errorDetails,
    };
};
exports.default = handleZodError;
