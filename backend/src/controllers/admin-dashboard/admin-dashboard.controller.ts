import { Request, Response, Router } from "express";
import { Controller } from "../controller";
import { checkAuth } from "../../authorisation/basic.auth";
import { collections } from "../../services/database.service";
import { IAdminDashboard } from "../../models/admin-dashboard.model";
import { Logger } from "../../util/logger";
import AdminDashboard from "../../models/admin-dashboard.model";

export class AdminDashboardController implements Controller {
  collection: string = "admin_dashboard";
  path: string = "/admin-dashboard";
  router: Router = Router();

  initaliseRoutes(): void {
    this.router.get("/about", this.getAboutDetails);

    // authorisation required for all actions below
    this.router.use(checkAuth(["admin"]));

    this.router.get("/is-authorised", this.isAuthorised);

    this.router.patch("/", this.postAdminDashboard);
  }

  getAboutDetails = async (request: Request, response: Response) => {
    try {
      const about = (await collections[
        this.collection
      ].findOne()) as IAdminDashboard;
      about
        ? response.status(200).send({
            data: { imageUrl: about.imageUrl, description: about.description },
          })
        : response.status(200).send({ data: {} });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.meesage });
    }
  };

  isAuthorised = async (request: Request, response: Response) => {
    response.status(200).send({ data: "authorised" });
  };

  postAdminDashboard = async (request: Request, response: Response) => {
    const updatedInfo = new AdminDashboard(request.body).toObject();
    delete updatedInfo._id;
    try {
      const result = await collections[this.collection].updateOne(
        {},
        { $set: updatedInfo },
        { upsert: true }
      );
      result
        ? response.status(201).send({ data: "Successfully updated dashboard" })
        : response.status(400).send({ data: "Failed to update dashboard" });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };
}
