function wrapper (fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res);
        } catch (error) {
            next(error);
        }
    }
}

export default wrapper;