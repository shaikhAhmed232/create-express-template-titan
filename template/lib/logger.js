import chalk from "chalk";
export const warnColor = chalk.hex('#FFA500');
const {log: cLog, warn: cWarn, error: cError, info: cInfo} = console;

const logFactory = (message, meta, level = 'INFO') =>  {
    const entry = {
        level,
        message,
        meta,
        timestamp: new Date().toISOString(),
    }
    return JSON.stringify(entry);
}

export function logger (message, options) {
    cLog(logFactory(message, options, "INFO"))
}

logger.warn = (message, options) => {
    cWarn(warnColor(logFactory(message, options, "WARNING")))
}

logger.error = (message, options) => {
    cError(chalk.red(logFactory(message, options, "ERROR")))
}

logger.log = (message, options) => {
    logger(message, options, "INFO");
}

logger.info = (message, options) => {
    cInfo(chalk.green(logFactory(message, options, "INFO")));
}

export default logger;