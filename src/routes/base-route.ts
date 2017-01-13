import { Request, Response, Router } from "express";

export class BaseRoute {
    public static create(router: Router) {
        throw Error("Seems you forgot to implement the create method!");
    }

    /**
     * Send a result as JSON enforcing the use of a defined envelope.
     * The envelope always contains a message and the data.
     * @param res {Response} The response object.
     * @param status The HTTP status to be sent.
     * @param message The message describing the result.
     * @param data The data to be sent.
     */
    public static sendJsonResult(res: Response, status: number, message: string, data: any) {
        const envelope = {
            data,
            message,
            status,
        };

        res.json(status, envelope);
    }

    protected title: string;

    /**
     * @class BaseRoute
     * @constructor
     */
    constructor() {
        this.title = "My Sample App";
    }

    /**
     * Render a page.
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {string} The view's name to render.
     * @param options {any} Additional options to append to the view's local scope.
     */
    public render(req: Request, res: Response, view: string, options?: any): void {
        res.locals.title = this.title;
        res.render(view, options);
    }
}
