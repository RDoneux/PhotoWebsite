import { Request, Response, Router } from "express";
import { collections } from "../../services/database.service";
import { Controller } from "../controller";
import { IImage } from "../../models/image.model";
import { Logger } from "../../util/logger";
import { checkAuth } from "../../authorisation/basic.auth";
import { ObjectId } from "mongodb";
import { ICollection } from "../../models/collection.model";
import Image from "../../models/image.model";

export class ImageController implements Controller {
  collection: string = "image";
  path: string = "/images";
  router: Router = Router();

  initaliseRoutes(): void {
    // GET
    this.router.get("/", this.getAllImages);
    this.router.get("/id/:id", this.getImageById);
    this.router.get("/:id/collections", this.getImageCollections);

    // authorisation required for all actions below
    this.router.use(checkAuth(["admin"]));

    // POST
    this.router.post("/", this.postImage);

    //PATCH
    this.router.patch("/:id", this.patchImage);

    //DELETE
    this.router.delete("/:id", this.deleteImage);
  }

  getAllImages = async (request: Request, response: Response) => {
    try {
      const images = (await collections[this.collection]
        .find({})
        .toArray()) as IImage[];
      response.status(200).send({ data: images });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  getImageById = async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
      const image = (await collections[this.collection].findOne({
        _id: new ObjectId(id),
      })) as IImage;
      image
        ? response.status(200).send({ data: image })
        : response.status(404).send({ data: `image with id ${id} not found` });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  getImageCollections = async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
      const colls = (await collections[this.collection]
        .aggregate([
          {
            $match: { _id: new ObjectId(id) },
          },
          {
            $lookup: {
              from: "collection",
              localField: "collections",
              foreignField: "_id",
              as: "collections",
            },
          },
          {
            $limit: 1,
          },
        ])
        .toArray()) as ICollection[];
      colls
        ? response.status(200).send({ data: colls[0] })
        : response.status(404).send({ data: `image with id ${id} not found` });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  postImage = async (request: Request, response: Response) => {
    try {
      const result = await collections[this.collection].insertOne(
        await Image.create(request.body)
      );
      result
        ? response.status(201).send({ data: "Successfully inserted new Image" })
        : response.status(400).send({ data: "Failed to insert new Image" });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  patchImage = async (request: Request, response: Response) => {
    const id = request.params.id;
    const newImage = new Image(request.body).toObject();
    delete newImage._id;
    try {
      const result = await collections[this.collection].updateOne(
        { _id: new ObjectId(id) },
        { $set: newImage },
        { upsert: true }
      );
      result
        ? response
            .status(201)
            .send({ data: `Successfully updated Image with id: ${id}` })
        : response
            .status(400)
            .send({ data: `Failed to update Image with id: ${id}` });
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };

  deleteImage = async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
      const result = await collections[this.collection].deleteOne({
        _id: new ObjectId(id),
      });
      if (result && result.deletedCount) {
        response
          .status(202)
          .send({ data: `Successfully deleted Image with id ${id}` });
      } else if (!result) {
        response
          .status(400)
          .send({ data: `Failed to delete Image with id ${id}` });
      } else if (!result.deletedCount) {
        response.status(404).send({
          data: `Failed to delete Image with id: ${id} because it doesn't exist`,
        });
      }
    } catch (error: any) {
      Logger.error(error);
      response.status(500).send({ data: error.message });
    }
  };
}
