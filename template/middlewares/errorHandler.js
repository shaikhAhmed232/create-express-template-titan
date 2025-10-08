import { HTTP_STATUS_CODES } from "../utils/constants.js";
import logger from "../lib/logger.js";
import { FailApiResponse } from "../lib/response.js";

function errorHandler (env = "development") {
    return (error, req, res, next) => {
    const status = error.status || 500;
    if (env === "development") {
        logger.error(error.message, {error: error.stack})
    };
    const data = status === HTTP_STATUS_CODES.BAD_REQUEST && error.data && error.data;
    const message = status === 500 ? "Internal server error" : error.message;
    const apiResponse = new FailApiResponse(message, data);
    res.status(status)  
        .json(apiResponse)
}
}

export default errorHandler;