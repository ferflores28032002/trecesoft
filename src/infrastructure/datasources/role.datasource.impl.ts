import RoleModel from "../../data/postgres/models/role.model";

import { CustomError } from "../../domain";
import { RoleDatasource } from "../../domain/datasources/role.datasource";
import { CreateRoleDto } from "../../domain/dtos/roles/create-role.dto";
import { UpdateRoleDto } from "../../domain/dtos/roles/update-role.dto";
import { RolEntity } from "../../domain/entities/rol.entity";
import { RoleMapper } from "../mappers/role.mapper";

export class RoleDatasourceImpl implements RoleDatasource {
  async createRole(createRoleDto: CreateRoleDto): Promise<RolEntity> {
    const { name, description } = createRoleDto;

    try {
      const role = await RoleModel.create({ name, description });

      await role.save();

      return RoleMapper.roleEntityFromObject(role);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer;
    }
  }

  async updateRole(updateRoleDto: UpdateRoleDto): Promise<RolEntity> {
    const { id, name, description, is_active } = updateRoleDto;

    try {
      const role = await RoleModel.findOne({ where: { id } });

      if (!role) throw CustomError.badRequest("Role not found");

      const updatedRole = await role.update({ name, description, is_active });

      await updatedRole.save();

      return RoleMapper.roleEntityFromObject(role);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer;
    }
  }
}
