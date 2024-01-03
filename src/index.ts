import "reflect-metadata";

import AppDataSource from "./config/db";
import app from "./app";
import { startApolloServer } from "./config/apolloServer";

async function main(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
    await startApolloServer(app);
    app.listen(3300);
    console.log("Server is listening on port 3300");
  } catch (error) {
    console.error(error);
  }
}
main();
