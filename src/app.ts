import {
  PostgresDatabase,
  initializeRolModel,
  initializeUserModel,
} from "./data/postgres";
import { Server } from "./presentation/Server";

import { AppRoutes } from "./presentation/routes";

import { envs } from "./config";
import { initializeAssociations } from "./data/postgres/models/initializeAssociations";

const connectionString = `postgresql://${envs.POSTGRES_USER}:${envs.POSTGRES_PASSWORD}@${envs.POSTGRES_HOST}:${envs.POSTGRES_PORT}/${envs.POSTGRES_DATABASE}`;

(async () => {
  const connected = await PostgresDatabase.connectDb({
    postgresUrl: connectionString,
  });

  if (connected) {
    const sequelizeInstance = PostgresDatabase.getSequelizeInstance();

    // initialize models
    const User = initializeUserModel(sequelizeInstance);
    const Role = initializeRolModel(sequelizeInstance);

    // Initialize associations
    initializeAssociations();

    // create intities
    await Role.sync();
    await User.sync();
  }

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
})();
