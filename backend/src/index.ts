import { Server } from "./server/server";
import figlet from "figlet";
import { TestController } from "./controllers/test/test.controller";
import dotenv from "dotenv";
import { ImageController } from "./controllers/image/image.controller";
import { CollectionController } from "./controllers/collection/collection.controller";

dotenv.config();
console.log(figlet.textSync("Photo Website"));
new Server(Number(process.env.PORT ?? 3000), [
  new TestController(),
  new ImageController(),
  new CollectionController(),
]);
