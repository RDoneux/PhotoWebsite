import { Controller } from "../controllers/controller";
import { TestController } from "../controllers/test/test.controller";
import { Logger, Process } from "../util/logger";
import { ScrollsServer } from "./server";
import * as DBService from "../services/database.service";
import { AdminController } from "../controllers/admin/admin.controller";

describe("server.ts", () => {
  var server: ScrollsServer;
  var testController: Controller;
  var process: Process;

  beforeEach(() => {
    process = new Process("sServer");
    jest.spyOn(Logger, "process").mockReturnValue(process);
    jest.spyOn(process, "task");
    testController = new TestController();
    jest.spyOn(testController, "initaliseRoutes");
    server = new ScrollsServer(3000, [testController]);
  });

  afterEach(() => {
    server.close();
  });

  it("Should create", () => {
    expect(server).toBeTruthy();
  });

  describe("on construct", () => {
    it("should produce correct logging output for successfull build", () => {
      expect(Logger.process).toHaveBeenCalledWith(
        "sServer",
        "Starting Scrolls Server"
      );
      expect(process.task).toHaveBeenCalledWith(
        "Scrolls Server listening on port: 3000"
      );
      expect(process.task).toHaveBeenCalledWith(
        "All controllers initalised",
        "SUCCESS"
      );
    });
    it("should initalise given controllers", () => {
      expect(testController.initaliseRoutes).toHaveBeenCalledTimes(1);
    });
    it("should warn the user if no controllers are passed", () => {
      server.close();
      server = new ScrollsServer(3000);
      expect(process.task).toHaveBeenCalledWith(
        "No controllers have been provided",
        "WARNING"
      );
    });
  });
  describe("initalise controllers", () => {
    it("should do nothing if passed an empty array", () => {
      server.close();
      server.initaliseControllers([]);
      expect(process.task).toHaveBeenCalledWith(
        "No controllers have been provided",
        "WARNING"
      );
    });
    it("should initalise controller routes", () => {
      server.close();
      const testController = new TestController();
      jest.spyOn(testController, "initaliseRoutes");
      server.initaliseControllers([testController]);
      expect(testController.initaliseRoutes).toHaveBeenCalledTimes(1);
    });
  });
  describe("initalise server", () => {
    it("should log error if database connection is unsuccessful", async () => {
      jest
        .spyOn(DBService, "connectToDatabase")
        .mockRejectedValue("error-response");
      jest.spyOn(Logger, "error");
      await server.initaliseServer([]);
      expect(Logger.error).toHaveBeenCalledWith(
        "Database connection failed error-response"
      );
    });
  });
  describe("close", () => {
    it("should log if http server hasn't been created yet", () => {
      jest.spyOn(Logger, "info").mockImplementation();
      jest.spyOn(Logger, "warning").mockImplementation();
      server.close();
      expect(Logger.info).toHaveBeenCalledWith("Closing the Scrolls Server");
      server.close();
      expect(Logger.warning).toHaveBeenCalledWith(
        "Cannot close http server either because it hasn't been created yet or because it has already been closed"
      );
    });
    it("should log if http server has been closed", () => {
      jest.spyOn(Logger, "info").mockImplementation();
      server.close();
      expect(Logger.info).toHaveBeenCalledWith("Closing the Scrolls Server");
    });
  });
});
