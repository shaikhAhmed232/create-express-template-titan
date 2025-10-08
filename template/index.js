import "dotenv/config";
import {createServer} from "node:http";
import logger from "./lib/logger.js";
import app from "./src/app.js";
import conf from "./config/index.js";
import { normalizePort, shutdownOnExceptionHandler, shutdownOnSignalHandler } from "./utils/helpers.js";

const server = createServer(app)

const processUncaught = ["uncaughtException", "unhandledRejection"]

processUncaught.forEach((exceptionStr) => {
    process.on(exceptionStr, shutdownOnExceptionHandler(exceptionStr, logger))
});

const signals = ["SIGINT", "SIGTERM"];

signals.forEach((signal) => {
    process.on(signal, shutdownOnSignalHandler(logger))
});

(async () => {
    try {
        const port = normalizePort(conf.get("port"));
        server.listen(port, () => {
            logger.info(`Server started and running on port ${port}`)
        })
    } catch (error) {
        throw error;
    }
})();