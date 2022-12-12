import { collections } from "../../services/database.service";
import { Logger } from "../../util/logger";
import { MessageController } from "./message.controller";
import Message from "../../models/message.model";

describe("message controller", () => {
  var component: MessageController;

  beforeEach(() => {
    component = new MessageController();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initalise routes", () => {
    jest.spyOn(component.router, "get");
    jest.spyOn(component.router, "post");

    component.initaliseRoutes();

    expect(component.router.get).toHaveBeenCalledTimes(1);
    expect(component.router.post).toHaveBeenCalledTimes(1);
  });

  describe("get all messages", () => {
    it("should return 200 response with given body", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["message"] = {
        find: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockReturnValue([{ value: "test-value" }]),
      };

      await component.getAllMessages(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: [{ value: "test-value" }],
      });
    });
    it("should return 500 response", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["message"] = undefined;
      jest.spyOn(Logger, "error");
      await component.getAllMessages(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });
  describe("post message", () => {
    it("should return 200 response with given body", async () => {
      const req: any = { body: { test: "test-body" } };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["message"] = {
        insertOne: jest.fn().mockReturnValue(true),
      };
      jest.spyOn(Message, "create").mockImplementation();
      await component.postMessage(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: "Successfully inserted new Message",
      });
    });
    it("should provide 400 response when unable to insert item", async () => {
      const req: any = { body: { test: "test-body" } };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["message"] = {
        insertOne: jest.fn().mockReturnValue(undefined),
      };
      await component.postMessage(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        data: "Failed to insert new Message",
      });
    });
    it("should provide 500 response with given body", async () => {
      const req: any = { body: { test: "test-body" } };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(Logger, "error");
      collections["message"] = undefined;
      await component.postMessage(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });
});
