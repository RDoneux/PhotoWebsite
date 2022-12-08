import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { checkAuth } from "../../authorisation/basic.auth";
import Collection from "../../models/collection.model";
import { ICollection } from "../../models/collection.model";
import { collections } from "../../services/database.service";
import { Logger } from "../../util/logger";
import { Controller } from "../controller";
import { IImage } from "../../models/image.model";

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

    // PATCH
    this.router.patch("/:id", this.patchCollection);

    // DELETE
    this.router.delete("/:id", this.deleteCollection);
  }

  private getAllCollections = async (request: Request, response: Response) => {
    try {
      const colls = (await collections[this.collection]
        .find({})
        .toArray()) as ICollection[];
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
      })) as ICollection;
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
        .toArray()) as IImage[];
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
        Collection.create(request.body)
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

  private patchCollection = async (request: Request, response: Response) => {
    const id = request.params.id;
    const test = new Collection(request.body).toObject();
    delete test._id;
    try {
      const result = await collections[this.collection].updateOne(
        { _id: new ObjectId(id) },
        { $set: test },
        { upsert: true }
      );
      result
        ? response
            .status(201)
            .send({ data: `Successfully updated collection with id: ${id}` })
        : response
            .status(400)
            .send({ data: `Failed to update collection with id: ${id}` });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  private deleteCollection = async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
      const result = await collections[this.collection].deleteOne({
        _id: new ObjectId(id),
      });
      if (result && result.deletedCount) {
        response
          .status(202)
          .send({ data: `Successfully deleted Collection with id ${id}` });
      } else if (!result) {
        response
          .status(400)
          .send({ data: `Failed to delete Collection with id ${id}` });
      } else if (!result.deletedCount) {
        response.status(404).send({
          data: `Failed to deleted Collection with id: ${id} because it doesn't exist`,
        });
      }
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };
}
