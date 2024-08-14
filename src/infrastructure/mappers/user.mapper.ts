import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }): UserEntity {
    const { _id, id, name, email, password, is_active, username, roleId } = object;

    const userId = id || _id;
    if (!userId) throw CustomError.badRequest("Missing user id");
    if (!name) throw CustomError.badRequest("Missing user name");
    if (!roleId) throw CustomError.badRequest("Missing user roleId");
    if (!username) throw CustomError.badRequest("Missing user username");
    if (!email) throw CustomError.badRequest("Missing user email");
    if (!password) throw CustomError.badRequest("Missing user password");

    return new UserEntity(userId, name, username, email, password, is_active, roleId);
  }
}
