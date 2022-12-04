import { ScrollsServer } from "./server/server";
import figlet from "figlet";
import { TestController } from "./controllers/test/test.controller";
import dotenv from "dotenv";

dotenv.config();
console.log(figlet.textSync("Scrolls"));
new ScrollsServer(Number(process.env.PORT ?? 3000), [new TestController()]);
