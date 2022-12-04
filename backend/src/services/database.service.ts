import * as mongoDB from "mongodb";
import { Logger } from "../util/logger";
import { Controller } from "../controllers/controller";

export const collections: { [key: string]: mongoDB.Collection }[] = [];

export async function connectToDatabase(controllers: Controller[]) {
  /* istanbul ignore file */
  const loggerProcess = Logger.process(
    "dbConnection",
    "Connecting to database"
  );
  if (!process.env.DB_CONNECTION_STRING || !process.env.DB_NAME) {
    loggerProcess.task(
      "Environmental variables not configured for database connection. Please specify a connection string and database name",
      "ERROR"
    );
    return;
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONNECTION_STRING
  );

  if (process.env.JEST_WORKER_ID) return;
  await client.connect();

  loggerProcess.task(
    `Successfully connected to database: ${process.env.DB_CONNECTION_STRING}${process.env.DB_NAME}`
  );

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  controllers.forEach((controller: Controller) => {
    collections[controller.collection] = db.collection(controller.collection);
  });

  await db.listCollections().forEach((collection) => {
    loggerProcess.task(
      `Successfully connected to '${collection.name}' collection`
    );
  });

  collections["access_keys"] = db.collection("access_keys");

  loggerProcess.task("Database initalised", "SUCCESS");
}
