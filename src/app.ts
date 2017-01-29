import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as favicon from "serve-favicon";

import { DateController } from "./controllers/date-controller";
import { UsersController } from "./controllers/users-controller";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();

        // view engine setup
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.set("view engine", "pug");

        this.app.use(favicon(path.join(__dirname, "../public", "favicon.ico")));
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "../public")));

        // my own controllers used in routing
        const dateController = new DateController();
        const usersController = new UsersController();

        // Don't *ever* forget this bind(...)! Without it, the "this" pointer
        // inside the controller would be totally wrong!
        this.app.get("/date", dateController.getDate.bind(dateController));
        this.app.get("/users", usersController.getUsers.bind(usersController));

        // catch 404 and forward to error handler
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err = new Error("Not Found");
            next(err);
        });

        // error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render("error");
        });
    }
}

export default new App().app;