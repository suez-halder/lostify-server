import { Response } from "express";

const sendResponse = async <T>(
    res: Response,
    jsonData: {
        statusCode: number;
        success: boolean;
        message: string;
        data: T;
    }
) => {
    res.status(jsonData.statusCode).json({
        statusCode: jsonData.statusCode,
        success: jsonData.success,
        message: jsonData.message,
        data: jsonData.data,
    });
};

export default sendResponse;
