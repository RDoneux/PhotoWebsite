import { collections } from "../../services/database.service";
import { UserController } from "./user.controller";
import bcrypt from "bcryptjs";

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
    jest.spyOn(component.router, "use");
    jest.spyOn(component.router, "post");

    component.initaliseRoutes();

    expect(component.router.get).toHaveBeenCalledTimes(1);
    expect(component.router.use).toHaveBeenCalledTimes(1);
    expect(component.router.post).toHaveBeenCalledTimes(1);
  });

  describe("authenticate", () => {
    it("should return 401 if no payload is sent", () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      component.authenticate(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ data: "invalid login" });
    });
    it("should return 500 if env.SIGNATURE is not set", () => {
      const req: any = {
        headers: {
          authorization: "Basic dGVzdC11c2VybmFtZTp0ZXN0LXBhc3N3b3Jk",
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      component.authenticate(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        data: "Essential environmental variables have not been set. Please see env.example to set up a valid .env file",
      });
    });
    it("should return 200 if login details are recognised", async () => {
      process.env = {
        SIGNATURE: "53d22aab-2a74-4607-803f-3583362de564",
      };
      const req: any = {
        headers: {
          authorization: "Basic dGVzdC11c2VybmFtZTp0ZXN0LXBhc3N3b3Jk",
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      collections["user"] = {
        find: jest.fn().mockReturnThis(),
        toArray: jest
          .fn()
          .mockReturnValue([
            { username: "test-username", password: "test-password" },
          ]),
      };

      jest.spyOn(bcrypt, "compare").mockImplementation(() => {
        return true;
      });

      await component.authenticate(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });
    it("should return 401 if login details are not recognised", async () => {
      process.env = {
        SIGNATURE: "53d22aab-2a74-4607-803f-3583362de564",
      };
      const req: any = {
        headers: {
          authorization: "Basic dGVzdC11c2VybmFtZTp0ZXN0LXBhc3N3b3Jk",
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      collections["user"] = {
        find: jest.fn().mockReturnThis(),
        toArray: jest
          .fn()
          .mockReturnValue([
            { username: "test-username", password: "test-password" },
          ]),
      };

      jest.spyOn(bcrypt, "compare").mockImplementation(() => {
        return false;
      });

      await component.authenticate(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ data: "invalid login" });
    });
    it("should return 500 if internal error", () => {
      process.env = {
        SIGNATURE: "53d22aab-2a74-4607-803f-3583362de564",
      };
      const req: any = {
        headers: {
          authorization: "Basic dGVzdC11c2VybmFtZTp0ZXN0LXBhc3N3b3Jk",
        },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["user"] = undefined;

      component.authenticate(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe("create new user", () => {
    it("should insert new user", async () => {
      const req: any = {
        body: { username: "test-username", password: "test-password" },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["user"] = { insertOne: jest.fn().mockReturnValue(true) };

      await component.createNewUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: "Successfully created new user",
      });
    });

    it("should insert new user", async () => {
      const req: any = {
        body: { username: "test-username", password: "test-password" },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["user"] = { insertOne: jest.fn().mockReturnValue(false) };

      await component.createNewUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        data: "Failed to create new user",
      });
    });

    it("should insert new user", async () => {
      const req: any = {
        body: { username: "test-username", password: "test-password" },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["user"] = undefined;

      await component.createNewUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
