import { CustomError } from "../../domain";
import { RolEntity } from "../../domain/entities/rol.entity";

export class RoleMapper {
  static roleEntityFromObject(object: { [key: string]: any }): RolEntity {
    const { _id, id, name, description, is_active} = object;

    const userId = id || _id;
    if (!userId) throw CustomError.badRequest("Missing role id");
    if (!name) throw CustomError.badRequest("Missing user name");
    if (!description) throw CustomError.badRequest("Missing role description");

    return new RolEntity(userId, name, description, is_active);
  }
}
