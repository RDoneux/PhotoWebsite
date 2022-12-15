import { Request, Response, Router } from "express";
import { collections } from "../../services/database.service";
import { Controller } from "../controller";
import User, { IUser } from "../../models/user.model";
import { Logger } from "../../util/logger";
import { checkAuth } from "../../authorisation/basic.auth";

export class UserController implements Controller {
  collection: string = "user";
  path: string = "/user";
  router: Router = Router();

  initaliseRoutes(): void {
    //GET
    this.router.get("/", this.getUser);

    // authorisation required for all actions below
    this.router.use(checkAuth(["admin"]));

    //POST
    this.router.patch("/", this.patchUser);
  }

  getUser = async (request: Request, response: Response) => {
    try {
      const user = (await collections[this.collection].findOne({})) as IUser;
      response.status(200).send({ data: user });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  patchUser = async (request: Request, response: Response) => {
    const user = new User(request.body).toObject();
    delete user._id;
    try {
      const result = await collections[this.collection].replaceOne({}, user, {
        upsert: true,
      });
      result
        ? response.status(201).send({ data: `Successfully updated User` })
        : response.status(400).send({ data: "Failed to update User" });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };
}
