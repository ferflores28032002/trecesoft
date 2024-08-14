import { NextFunction, Request, Response } from "express";

import { JwtAdapter } from "../../config/jwt";

import RoleModel from "../../data/postgres/models/role.model";
import UserModel from "../../data/postgres/models/user.model";

export class AuthMiddleware {
  static validateJwt = (allowedRoles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.header("Authorization");
      if (!authorization)
        return res.status(401).json({ error: "No token Provider" });
      if (!authorization.startsWith("Bearer "))
        return res.status(401).json({ error: "Invalid Bearer Token" });

      const token = authorization.split(" ").at(1) || "";

      try {
        const payload = await JwtAdapter.validateToken<{ id: string }>(token);
        if (!payload) return res.status(401).json({ error: "Invalid Token" });

        const user = await UserModel.findByPk(payload.id);
        if (!user)
          return res
            .status(401)
            .json({ error: "Invalid Token - User not found" });

        // Obtener el rol del usuario desde la base de datos utilizando el roleId
        const role = await RoleModel.findOne({
          where: {
            id: user.roleId,
          },
        });

        if (!role) {
          return res.status(403).json({ error: "Role not found" });
        }

        // Verificar si el rol está permitido
        if (!allowedRoles.includes(role.name)) {
          return res
            .status(403)
            .json({ error: "Access denied: insufficient permissions" });
        }

        req.body.user = user;
        req.body.role = role;

        next();
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error Middleware" });
      }
    };
  };
}
