import RoleModel from "./role.model";
import UserModel from "./user.model";

export const initializeAssociations = () => {
  // Un usuario pertenece a un rol
  UserModel.belongsTo(RoleModel, { foreignKey: "roleId", as: "role" });

  // Un rol tiene muchos usuarios
  RoleModel.hasMany(UserModel, { foreignKey: "roleId", as: "users" });
};
