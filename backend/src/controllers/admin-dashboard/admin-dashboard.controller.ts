import { Request, Response, Router } from "express";
import { Controller } from "../controller";
import { checkAuth } from "../../authorisation/basic.auth";

export class AdminDashboardController implements Controller {
  collection: string = "admin_dashboard";
  path: string = "/admin-dashboard";
  router: Router = Router();

  initaliseRoutes(): void {
    // authorisation required for all actions below
    this.router.use(checkAuth(["admin"]));

    this.router.get("/is-authorised", this.isAuthorised);
  }

  isAuthorised = async (request: Request, response: Response) => {
    response.status(200).send({ data: "authorised" });
  };
}
