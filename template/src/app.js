import express from "express";
import conf from "../config/index.js";
import errorHandler from "../middlewares/errorHandler.js";
import cors from "cors";
import apiLogger from "../middlewares/apiLogger.js";
import { NotFound } from "../utils/errors.js";
import mainRouter from "./routes/index.js";

const app = express();

app.use(cors());

app.use(apiLogger);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', mainRouter)

app.use((req, res, next) => {
    next(new NotFound("Not found"))
})

app.use(errorHandler(conf.get("env")));

export default app;
