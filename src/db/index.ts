import { DataSource } from "typeorm";

import { AppDataSource } from "./config";

export const datasourceInit = async (): Promise<DataSource> => {
  const connection = await AppDataSource.initialize();
  return connection;
};
