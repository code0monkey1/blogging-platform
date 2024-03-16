import express, { NextFunction, Request, Response, json } from "express";
import logger from "./config/logger";
import { HttpError } from "http-errors";
const app = express();
import "express-async-errors";
import postRouter from "./routers/post-router";

app.use(json());

app.get("/data", (req, res) => {
    res.json({ data: "will  crash again" });
});

app.use("/posts", postRouter);

app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (error: HttpError, req: Request, res: Response, _next: NextFunction) => {
        logger.error(error.message);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            errors: [
                {
                    type: error.message,
                    path: "",
                    location: "",
                },
            ],
        });
    },
);

export default app;
