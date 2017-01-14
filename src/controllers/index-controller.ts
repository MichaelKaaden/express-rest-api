import { NextFunction, Request, Response, Router } from "express";

export class IndexController {
    private date: Date;

    constructor() {
        this.date = new Date();
    }

    public getDate(req: Request, res: Response, next: NextFunction): void {
        res.render("index", {
            date: this.date,
            title: "Express",
        });
    }
}
