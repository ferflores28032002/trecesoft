import { Sequelize } from 'sequelize';

interface Options {
  postgresUrl: string;
}

export class PostgresDatabase {
  private static sequelize: Sequelize;

  static async connectDb(options: Options) {
    const { postgresUrl } = options;

    this.sequelize = new Sequelize(postgresUrl, {
      dialect: 'postgres',
      logging: false, // Desactiva el registro de consultas SQL en la consola
    });

    try {
      await this.sequelize.authenticate();
      console.log("Connected to PostgreSQL");
      return true;
    } catch (error) {
      console.error("Error connecting to PostgreSQL:", error);
      return false;
    }
  }

  static getSequelizeInstance() {
    if (!this.sequelize) {
      throw new Error("Sequelize instance has not been initialized. Please call connectDb first.");
    }
    return this.sequelize;
  }
}
