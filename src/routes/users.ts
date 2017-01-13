import { NextFunction, Request, Response, Router } from 'express';

import { BaseRoute } from './base-route';

export class UsersRoute extends BaseRoute {

    public static create(router: Router) {
        /* GET users listing. */
        router.get('/users', (req: Request, res: Response, next: NextFunction) => {
                res.send('respond with a resource');
            }
        );
    }
}
