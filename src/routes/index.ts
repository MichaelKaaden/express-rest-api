import { NextFunction, Request, Response, Router } from "express";

import { IndexController } from "../controllers/index-controller";
import { BaseRoute } from "./base-route";

export class IndexRoute extends BaseRoute {

    public static create(router: Router) {
        const indexController = new IndexController();

        /* GET home page. */
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.render("index", {
                date: indexController.getDate(),
                title: "Express",
            });
        });
    }

    constructor() {
        super();
    }
}
