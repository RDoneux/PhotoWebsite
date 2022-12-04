import { authLevel, checkAuth, requireAuth } from "./basic.auth";

describe("basicAuth", () => {
  describe("check auth", () => {
    it("should authorise if privilages match given auth level", () => {
      const req: any = {
        access: { privilages: ["test-privilage"] },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const next: any = jest.fn();

      checkAuth(["test-privilage"])(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
    it("should return 401 if privilages don't match given auth level", () => {
      const req: any = {
        access: { privilages: ["not-test-privilage"] },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const next: any = jest.fn();
      checkAuth(["test-privilage"])(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ data: "Not Authorised" });
      expect(next).not.toHaveBeenCalled();
    });
  });
  describe("auth level", () => {
    it("should return level", () => {
      const level = authLevel(["test-level-1", "test-level-2"]);
      expect(level).toEqual(["test-level-1", "test-level-2"]);
    });
  });
  describe("require auth", () => {
    it("should call next if access has been granted", () => {
      const req: any = {
        access: {},
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const next: any = jest.fn();

      requireAuth(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
    it("should return 401 if access hasn't been granted", () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const next: any = jest.fn();

      requireAuth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ data: "Not Authorised" });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
