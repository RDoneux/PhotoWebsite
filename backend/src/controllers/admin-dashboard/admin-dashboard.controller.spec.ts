import { collections } from "../../services/database.service";
import { AdminDashboardController } from "./admin-dashboard.controller";

describe("user controller", () => {
  var component: AdminDashboardController;

  beforeEach(() => {
    component = new AdminDashboardController();
  });

  it("should create", () => {
    expect(component).toBeDefined();
  });

  it("should initalise routes", () => {
    jest.spyOn(component.router, "get");
    jest.spyOn(component.router, "use");
    jest.spyOn(component.router, "patch");

    component.initaliseRoutes();

    expect(component.router.get).toHaveBeenCalledTimes(2);
    expect(component.router.use).toHaveBeenCalledTimes(1);
    expect(component.router.patch).toHaveBeenCalledTimes(1);
  });

  describe("get about details", () => {
    it("should get details", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const testImage = {
        imageUrl: "test-image-url",
        description: "test-description",
      };
      collections["admin_dashboard"] = {
        findOne: jest.fn().mockReturnValue(testImage),
      };

      await component.getAboutDetails(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: testImage,
      });
    });
    it("should return empty object when there are no details to return", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const testImage = {};
      collections["admin_dashboard"] = {
        findOne: jest.fn().mockReturnValue(undefined),
      };

      await component.getAboutDetails(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: testImage,
      });
    });
    it("should status 500 when internal error", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["admin_dashboard"] = undefined;

      await component.getAboutDetails(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe("isAuthorised", () => {
    it("should return 200 response", () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      component.isAuthorised(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ data: "authorised" });
    });
  });

  describe("post admin dashboard", () => {
    it("should return 201 status", async () => {
      const req: any = {
        body: { imageUrl: "test-image-url", description: "test-description" },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["admin_dashboard"] = {
        updateOne: jest.fn().mockReturnValue(true),
      };

      await component.postAdminDashboard(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: "Successfully updated dashboard",
      });
    });

    it("should return 400 status", async () => {
      const req: any = {
        body: { imageUrl: "test-image-url", description: "test-description" },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["admin_dashboard"] = {
        updateOne: jest.fn().mockReturnValue(false),
      };

      await component.postAdminDashboard(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        data: "Failed to update dashboard",
      });
    });

    it("should status 500 when internal error", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["admin_dashboard"] = undefined;

      await component.postAdminDashboard(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
