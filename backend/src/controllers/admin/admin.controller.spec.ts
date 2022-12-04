import path from "path";
import express from "express";
import { AdminController } from "./admin.controller";

describe("admin controller", () => {
  describe("initalise routes", () => {
    beforeEach(() => {
      jest.spyOn(express, "static");
      jest.spyOn(path, "join");
    });

    it("should call correct page location for production build", () => {
      process.env = { PRODUCTION: "true" };

      const adminController = new AdminController();

      adminController.initaliseRoutes();

      expect(path.join).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining("pages/request-token")
      );
      expect(path.join).toHaveBeenCalledWith(
        expect.any(String),
        expect.not.stringContaining("../../pages/request-token")
      );
    });
    it("should call correct page location for none production build", () => {
      process.env = { PRODUCTION: "false" };

      const adminController = new AdminController();

      adminController.initaliseRoutes();

      expect(path.join).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining("../../pages/request-token")
      );
    });
  });
});
