import { Router } from "express";

import { RoleDatasourceImpl } from "../../infrastructure/datasources/role.datasource.impl";
import { RoleRepositoryImpl } from "../../infrastructure/repositories/role.repository.impl";
import { RoleController } from "./controller";

export class RoleRoutes {
  static get routes(): Router {
    const router = Router();
    const roleDatasource = new RoleDatasourceImpl();
    const roleRepository = new RoleRepositoryImpl(roleDatasource);
    const controller = new RoleController(roleRepository);

    router.post("/", controller.createRole);

    router.get("/", controller.getRoles);

    return router;
  }
}
