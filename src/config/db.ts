import { DataSource } from "typeorm";

import { Admin, Category, Product, ProductOption } from "@tenderi-io/entity/dist/entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5430,
  username: "postgres",
  password: "postgres",
  database: "shop-db",
  synchronize: true,
  logging: true,
  entities: [Admin, Category, Product, ProductOption]
});

export default AppDataSource;
