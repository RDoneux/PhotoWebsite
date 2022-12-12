import { Request, Response, Router } from "express";
import { collections } from "../../services/database.service";
import { Logger } from "../../util/logger";
import { Controller } from "../controller";
import Message, { IMessage } from "../../models/message.model";

export class MessageController implements Controller {
  collection: string = "message";
  path: string = "/messages";
  router: Router = Router();

  initaliseRoutes(): void {
    //GET
    this.router.get("/", this.getAllMessages);

    //POST
    this.router.post("/", this.postMessage);
  }

  getAllMessages = async (request: Request, response: Response) => {
    try {
      const messages = (await collections[this.collection]
        .find({})
        .toArray()) as IMessage[];
      response.status(200).send({ data: messages });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  postMessage = async (request: Request, response: Response) => {
    try {
      const result = await collections[this.collection].insertOne(
        new Message(request.body)
      );
      result
        ? response
            .status(201)
            .send({ data: "Successfully inserted new Message" })
        : response.status(400).send({ data: "Failed to insert new Message" });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };
}
