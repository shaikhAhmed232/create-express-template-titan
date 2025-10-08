import { Router } from "express"
import { SuccessResponse } from "../../lib/response.js";
import { HTTP_STATUS_CODES } from "../../utils/constants.js";

const router = Router();

router.get("/", (req, res) => {
    const response = new SuccessResponse('User data');
    res.status(HTTP_STATUS_CODES.OK).json(response);
})

export default router;