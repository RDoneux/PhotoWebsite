import express from "express";
import http from "http";
import https from "https";
import bodyParser from "body-parser";
import { Controller } from "../controllers/controller";
import { Logger } from "../util/logger";
import { connectToDatabase } from "../services/database.service";
import { checkAuth, requireAuth } from "../authorisation/basic.auth";
import compress from "compression";
import { issueToken, tokenAuth } from "../authorisation/tokens.auth";
import { AdminController } from "../controllers/admin/admin.controller";
import { Error } from "mongoose";
import fs from "fs";
import path from "path";

export class Server {
  private server = express();
  private http:
    | http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
    | undefined;

  constructor(port: number, controllers?: Controller[]) {
    const sServer = Logger.process("sServer", "Starting Photo Website Server");

    const options = {
      key: fs.readFileSync(path.join(__dirname, "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "server.crt")),
    };

    http.createServer(this.server).listen(3500);
    https.createServer(options, this.server).listen(3501);
    this.startServer(port, controllers);
  }

  /* istanbul ignore next */
  private startServer(port: number, controllers?: Controller[]) {
    this.http = this.server.listen(port);
    this.http.on("error", (error: any) => {
      if (error.code === "EADDRINUSE") {
        Logger.warning(
          `Port ${port} is in use. Attempting to start server on port ${
            port + 1
          }`
        );
        this.http?.close();
        this.startServer((port += 1), controllers);
        return;
      }
    });
    this.setup(port, controllers);
  }

  private setup(port: number, controllers?: Controller[]) {
    const sServer = Logger.process("sServer");
    sServer.task(`Photo Website Server listening on port: ${port}`);

    this.initaliseUtilServices();
    this.initaliseAdminServices();
    this.initaliseAuthServices();

    this.initaliseControllers(controllers ?? []);
    this.initaliseServer(controllers ?? []);

    this.initaliseNotFound();

    sServer.task("All controllers initalised", "SUCCESS");
  }

  private initaliseUtilServices() {
    this.server.use(Logger.express);
    this.server.use(compress());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());
    Logger.process("sServer").task("Util services initalised");
  }

  private initaliseAdminServices() {
    const adminController = new AdminController();
    this.server.use(adminController.path, adminController.router);
    adminController.initaliseRoutes();

    this.server.use("/issue-token", issueToken);
    Logger.process("sServer").task("Admin services initalised");
  }

  private initaliseAuthServices() {
    this.server.use(tokenAuth);
    this.server.use(requireAuth);
    this.server.use(checkAuth(["visitor", "admin"]));
    Logger.process("sServer").task("Auth services initalised");
  }

  /* istanbul ignore next */
  private initaliseNotFound() {
    this.server.use((req, res) => {
      res.status(404).send({ data: "Route not found" });
    });
  }

  initaliseServer(controllers: Controller[]) {
    connectToDatabase(controllers).catch((error: Error) => {
      Logger.error(`Database connection failed ${error}`);
    });
  }

  initaliseControllers(controllers: Controller[]) {
    Logger.process("sServer").task("Initalising Controllers...");
    if (controllers.length === 0) {
      Logger.process("sServer").task(
        "No controllers have been provided",
        "WARNING"
      );
    } else {
      controllers.forEach((controller: Controller) => {
        controller.initaliseRoutes();
        this.server.use(controller.path, controller.router);
        Logger.process("sServer").task(
          `${controller.collection} Controller Initalised`
        );
      });
    }
  }

  public close() {
    if (!this.http) {
      Logger.warning(
        "Cannot close http server either because it hasn't been created yet or because it has already been closed"
      );
      return;
    }
    Logger.info("Closing the Photo Website Server");
    this.http.close();
    this.http = undefined;
  }
}
