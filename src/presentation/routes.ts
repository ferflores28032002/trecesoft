import { Router } from "express";

import { AuthRoutes } from "./auth/routes";
import { RoleRoutes } from "./role/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/auth", AuthRoutes.routes);
    router.use("/api/v1/role", RoleRoutes.routes);

    return router;
  }
}
