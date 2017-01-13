import { Request, Response, Router } from "express";

export class BaseRoute {
    public static create(router: Router) {
        throw Error("Seems you forgot to implement the create method!");
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
