import { CreateRoleDto } from "../dtos/roles/create-role.dto";
import { UpdateRoleDto } from "../dtos/roles/update-role.dto";

import { RolEntity } from "../entities/rol.entity";

export abstract class RoleRepository {
  abstract createRole(createRoleDto: CreateRoleDto): Promise<RolEntity>;
  abstract updateRole(updateRoleDto: UpdateRoleDto): Promise<RolEntity>;
}
