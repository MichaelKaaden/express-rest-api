import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./base-controller";

import * as jwt from "jwt-simple";

export class AuthController extends BaseController {
    private _fakeUsers = [];

    constructor() {
        super();

        this._fakeUsers = [
            {
                email: "nelly@the-joneses.com",
                id: 1,
                name: "Nelly Jones",
                password: "Asdf1234!",
            },
            {
                email: "jim@the-joneses.com",
                id: 2,
                name: "Jim Jones",
                password: "Asdf1234!",
            },
        ];

    }

    public authenticate(req: Request, res: Response, next: NextFunction): void {
        const name = req.body.name;
        const password = req.body.password;

        let user = this._fakeUsers.find((elem, index, array) => {
            return elem.name === name && elem.password === password;
        });

        if (!user) {
            res.status(401).send({message: "User not found"});
        } else {
            const token = jwt.encode(user, "foo!");  // encode the user object with this secret ...
            res.json(200, {token: `JWT ${token}`});  // ... and send it back
        }
    }
}
