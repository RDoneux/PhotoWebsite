import { collections } from "../../services/database.service";
import { Logger } from "../../util/logger";
import { UserController } from "./user.controller";

describe("user controller", () => {
  var component: UserController;

  beforeEach(() => {
    component = new UserController();
  });

  it("should create", () => {
    expect(component).toBeDefined();
  });

  it("should initalise routes", () => {
    jest.spyOn(component.router, "get");
    jest.spyOn(component.router, "patch");

    component.initaliseRoutes();

    expect(component.router.get).toHaveBeenCalledTimes(1);
    expect(component.router.patch).toHaveBeenCalledTimes(1);
  });

  describe("get User", () => {
    it("should return 200 with given body", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["user"] = {
        findOne: jest.fn().mockReturnValue({ value: "test-value" }),
      };
      await component.getUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: { value: "test-value" },
      });
    });
    it("should provide 500 response when unable to connect to db for all records", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["user"] = undefined;
      jest.spyOn(Logger, "error");
      await component.getUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });
  describe("patch user", () => {
    it("should provide 200 response with given body", async () => {
      const req: any = {
        body: { test: "body" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["user"] = {
        replaceOne: jest.fn().mockReturnValue(true),
      };
      await component.patchUser(req, res);
      expect(collections["user"].replaceOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: `Successfully updated User`,
      });
    });
    it("should provide 400 response if result is not found", async () => {
      const req: any = {
        body: { test: "body" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["user"] = {
        replaceOne: jest.fn().mockReturnValue(false),
      };
      await component.patchUser(req, res);
      expect(collections["user"].replaceOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        data: `Failed to update User`,
      });
    });
    it("should provide 500 response when error", async () => {
      const req: any = {
        body: { test: "body" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["user"] = undefined;
      jest.spyOn(Logger, "error");
      await component.patchUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });
});
