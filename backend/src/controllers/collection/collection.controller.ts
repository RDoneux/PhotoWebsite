import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { checkAuth } from "../../authorisation/basic.auth";
import Collection from "../../models/collection.model";
import { collections } from "../../services/database.service";
import { Logger } from "../../util/logger";
import { Controller } from "../controller";
import Image from "../../models/image.model";

export class CollectionController implements Controller {
  collection: string = "collection";
  path: string = "/collections";
  router: Router = Router();

  initaliseRoutes(): void {
    // GET
    this.router.get("/", this.getAllCollections);
    this.router.get("/id/:id", this.getCollection);
    this.router.get("/:id/images", this.getCollectionImages);

    // authorisation required for all actions below
    this.router.use(checkAuth(["admin"]));

    // POST
    this.router.post("/", this.postCollection);
  }

  private getAllCollections = async (request: Request, response: Response) => {
    try {
      const colls = (await collections[this.collection]
        .find({})
        .toArray()) as Collection[];
      response.status(200).send({ data: colls });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  private getCollection = async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
      const collection = (await collections[this.collection].findOne({
        _id: new ObjectId(id),
      })) as Collection;
      collection
        ? response.status(200).send({ data: collection })
        : response
            .status(404)
            .send({ data: `collection with id ${id} not found` });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  private getCollectionImages = async (
    request: Request,
    response: Response
  ) => {
    const id = request.params.id;
    try {
      const images = (await collections[this.collection]
        .aggregate([
          {
            $match: { _id: new ObjectId(id) },
          },
          {
            $lookup: {
              from: "image",
              localField: "images",
              foreignField: "_id",
              as: "images",
            },
          },
          {
            $limit: 1,
          },
        ])
        .toArray()) as Image[];
      images
        ? response.status(200).send({ data: images[0] })
        : response
            .status(404)
            .send({ data: `collection with id ${id} not found` });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  private postCollection = async (request: Request, response: Response) => {
    try {
      const result = await collections[this.collection].insertOne(
        request.body as Collection
      );
      result
        ? response
            .status(201)
            .send({ data: "Successfully inserted new Collection" })
        : response
            .status(400)
            .send({ data: "Failed to insert new Collection" });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };
}
