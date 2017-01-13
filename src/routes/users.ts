import { NextFunction, Request, Response, Router } from "express";

import { BaseRoute } from "./base-route";

export class UsersRoute extends BaseRoute {

    public static create(router: Router) {
        /* GET users listing. */
        router.get("/users", (req: Request, res: Response, next: NextFunction) => {
            this.sendJsonResult(res, 200, "okay", {greeting: "Hello World!"});
        });
    }

    constructor() {
        super();
    }
}
