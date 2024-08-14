import { DataTypes, Model, Sequelize } from "sequelize";

class RoleModel extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public is_active!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initializeRolModel = (sequelizeInstance: Sequelize) => {
  RoleModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
    },

    {
      sequelize: sequelizeInstance,
      tableName: "roles",
    }
  );
  return RoleModel;
};

export default RoleModel;
