import { Request, Response } from "express";
import { CustomError } from "../../domain";

import RoleModel from "../../data/postgres/models/role.model";
import { CreateRoleDto } from "../../domain/dtos/roles/create-role.dto";
import { RoleRepository } from "../../domain/repositories/role.repository";
import { CreateRole } from "../../domain/use-cases/roles/createRole.use-case";

export class RoleController {
  constructor(private readonly roleRepository: RoleRepository) {}

  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  createRole = async (req: Request, res: Response) => {
    const [error, createRoleDto] = CreateRoleDto.createRole(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    new CreateRole(this.roleRepository)
      .execute(createRoleDto!)
      .then((role) => res.json(role))
      .catch((error) => this.handlerError(error, res));
  };

  getRoles = (req: Request, res: Response) => {
    RoleModel.findAll()
      .then((roles) =>
        res.json({
          roles,
        })
      )
      .catch(() => res.status(400).json({ error: "Internal Server Error" }));
  };
}
