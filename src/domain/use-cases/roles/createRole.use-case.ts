import { CreateRoleDto } from "../../dtos/roles/create-role.dto";

import { RoleRepository } from "../../repositories/role.repository";

import { RolEntity } from "../../entities/rol.entity";

interface CreateRoleUseCase {
  execute(createRoleDto: CreateRoleDto): Promise<RolEntity>;
}

export class CreateRole implements CreateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(createRoleUserDto: CreateRoleDto): Promise<RolEntity> {
    const role = await this.roleRepository.createRole(createRoleUserDto);

    return role;
  }
}
