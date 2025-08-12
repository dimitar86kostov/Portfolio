import { Express, Response, Request } from "express";
import { createUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource";
import { createUserSessionHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import { createUserHandler } from "./controller/user.controller";

function routes(app: Express) {

    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

    app.post("/api/users", validateResource(createUserSchema), createUserHandler)

    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler)

}

export default routes;