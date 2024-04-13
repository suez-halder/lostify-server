import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ApiError from "../errors/ApiError";
import handleZodError from "../errors/handleZodError";
import { TErrorDetails } from "../interfaces/error";

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = "Something went wrong!";

    let errorDetails;

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message.join(". ") + ".";
        errorDetails = { issues: [simplifiedError.errorDetails] };
    } else if (err instanceof ApiError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorDetails = err;
    } else if (err instanceof Error) {
        message = err?.message;
        errorDetails = err;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorDetails,
    });
};

export default globalErrorHandler;
