import chalk from "chalk";
function apiLogger (req, res, next) {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const timestamp = new Date().toISOString();
        const str = `${timestamp} ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
        const color = res.statusCode >= 400 ? chalk.red : chalk.green;
        const cLog = res.statusCode >= 400 ? console.error : console.info;
        cLog(color.bold(str)); 
    })
    next();
}

export default apiLogger;