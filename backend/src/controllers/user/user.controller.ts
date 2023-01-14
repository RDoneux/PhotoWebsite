import { Request, Response, Router } from "express";
import { collections } from "../../services/database.service";
import { Controller } from "../controller";
import User, { IUser } from "../../models/user.model";
import { Logger } from "../../util/logger";
import { checkAuth } from "../../authorisation/basic.auth";
import { createToken } from "../../authorisation/tokens.auth";
import bcrypt from "bcryptjs";

export class UserController implements Controller {
  collection: string = "user";
  path: string = "/user";
  router: Router = Router();

  initaliseRoutes(): void {
    //GET
    this.router.get("/", this.authenticate);

    // authorisation required for all actions below
    this.router.use(checkAuth(["admin"]));

    this.router.post("/", this.createNewUser);
    //POST
    // this.router.patch("/", this.patchUser);
  }

  authenticate = async (request: Request, response: Response) => {
    const payload = request.headers?.authorization?.split(" ")[1];

    if (!payload) {
      response.status(401).send({ data: "invalid login" });
      return;
    }
    const [username, password] = Buffer.from(payload, "base64")
      .toString("ascii")
      .split(":");

    try {
      const signature = process.env.SIGNATURE;
      if (!signature) {
        response.status(500).send({
          data: "Essential environmental variables have not been set. Please see env.example to set up a valid .env file",
        });
        return;
      }

      const users = (await collections[this.collection]
        .find({})
        .toArray()) as IUser[];

      var result = new Promise<boolean>((resolve, reject) => {
        users.forEach(async (user: IUser, index: number) => {
          const usernameMatch = await bcrypt.compare(username, user.username);
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (usernameMatch && passwordMatch) {
            resolve(true);
          }
          if (index === users.length - 1) resolve(false);
        });
      });

      (await result)
        ? response.status(200).send({
            data: createToken(
              signature,
              {
                title: "admin access",
                privilages: ["visitor", "admin"],
              },
              1
            ),
          })
        : response.status(401).send({ data: "invalid login" });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  createNewUser = async (request: Request, response: Response) => {
    try {
      const result = await collections[this.collection].insertOne(
        new User(request.body)
      );
      result
        ? response.status(201).send({ data: "Successfully created new user" })
        : response.status(400).send({ data: "Failed to create new user" });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };
}
