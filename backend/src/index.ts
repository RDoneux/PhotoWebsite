import { Server } from "./server/server";
import figlet from "figlet";
import { TestController } from "./controllers/test/test.controller";
import dotenv from "dotenv";

dotenv.config();
console.log(figlet.textSync("Photo Website"));
new Server(Number(process.env.PORT ?? 3000), [new TestController()]);
