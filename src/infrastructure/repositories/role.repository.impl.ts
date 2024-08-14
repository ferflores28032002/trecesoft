import { RoleDatasource } from "../../domain/datasources/role.datasource";
import { CreateRoleDto } from "../../domain/dtos/roles/create-role.dto";
import { UpdateRoleDto } from "../../domain/dtos/roles/update-role.dto";
import { RolEntity } from "../../domain/entities/rol.entity";
import { RoleRepository } from "../../domain/repositories/role.repository";

export class RoleRepositoryImpl implements RoleRepository {
  constructor(private readonly roleDatasource: RoleDatasource) {}

  createRole(createRoleDto: CreateRoleDto): Promise<RolEntity> {
    return this.roleDatasource.createRole(createRoleDto);
  }
  updateRole(updateRoleDto: UpdateRoleDto): Promise<RolEntity> {
    return this.roleDatasource.updateRole(updateRoleDto);
  }
}
