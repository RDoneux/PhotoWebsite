import express, { Request, Router, Response } from "express";
import path from "path";
import { Controller } from "../controller";

export class AdminController implements Controller {
  collection: string = "admin";
  path: string = "/admin";
  router: Router = Router();

  initaliseRoutes(): void {
    this.router.use(
      "/request-token",
      express.static(
        path.join(
          __dirname,
          `${
            process.env.PRODUCTION === "true"
              ? "pages/request-token"
              : "../../pages/request-token"
          }`
        )
      )
    );
  }
}
