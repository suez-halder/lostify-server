import { ZodError } from "zod";
import { TErrorDetails, TGenericErrorResponse } from "../interfaces/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorDetails: TErrorDetails[] = err.issues.map((issue) => ({
        field: issue.path[issue.path.length - 1].toString(),
        message: issue.message,
    }));

    return {
        statusCode: 400,
        message: errorDetails.map((issue) => issue.message),
        errorDetails,
    };
};

export default handleZodError;
