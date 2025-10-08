import logger from "../lib/logger.js";

export function normalizePort (val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port > 0) {
        return port;
    }
    return false;
}

export function shutdownOnExceptionHandler (exceptionStr) {
    return (exception) => {
        logger.error(`${exceptionStr}`, {error: exception.name, message: exception.message})
        process.exit(1);
    }
};

export function shutdownOnSignalHandler () {
    return (signal) => {
  logger.warn(`Stopping server due to ${signal}`);
  process.exit(0);
};
}

