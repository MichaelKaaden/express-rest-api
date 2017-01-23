import { NextFunction, Request, Response, Router } from "express";

export abstract class BaseController {
    /**
     * Send a result as JSON enforcing the use of a defined envelope.
     * The envelope always contains a message and the data.
     * @param res {Response} The response object.
     * @param status The HTTP status to be sent.
     * @param message The message describing the result.
     * @param data The data to be sent.
     */
    protected sendJsonResult(res: Response, status: number, message: string, data: any) {
        const envelope = {
            data,
            message,
            status,
        };

        res.status(status).json(envelope);
    }
}
