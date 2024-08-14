import { Router } from "express";

import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authDatasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(authDatasource);
    const controller = new AuthController(authRepository);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.patch("/update", AuthMiddleware.validateJwt(['superadmin']), controller.updateUser);
    router.delete("/delete/:id", AuthMiddleware.validateJwt(['superadmin']), controller.deleteUser);
    router.post("/send-email-password", controller.sendEmailPassword);
    router.post("/change-password", controller.changePassword);
    router.get("/", AuthMiddleware.validateJwt(['superadmin', 'generic']), controller.getUsers);

    return router;
  }
}
