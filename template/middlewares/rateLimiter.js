function requestRateLimiter (req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    const timeWindow = 15 * 60 * 1000;
    const maxRequestPerWin = 100;
    if (!requestCount[ip]) {
        requestCount[ip] = {
            count: 1,
            lastRequest: now,
        }
        next();
        return;
    }
    let diffSinceLastReq = now - requestCount[ip].lastRequest;
    if (timeWindow < diffSinceLastReq) {
        requestCount[ip] = {
            count: 1,
            lastRequest: now,
        }
        next();
        return;
    }
    requestCount[ip].count++;

    if (maxRequestPerWin < requestCount[ip].count) {
        res.status(429)
            .json({
                message: "Too many request, try again after 15 minutes"
            })
        return;
    }
    next();
}

export default requestRateLimiter;