import "reflect-metadata";

import AppDataSource from "./db/config";
import app, { startApolloServer } from "./app";

async function main(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
    await startApolloServer();
    app.listen(3300);
    console.log("Server is listening on port 3300");
  } catch (error) {
    console.error(error);
  }
}
main();
