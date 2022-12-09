import { Request, Response, Router } from "express";
import { collections } from "../../services/database.service";
import { Controller } from "../controller";
import { IImage } from "../../models/image.model";
import { Logger } from "../../util/logger";
import { checkAuth } from "../../authorisation/basic.auth";
import { ObjectId } from "mongodb";
import { ICollection } from "../../models/collection.model";
import Image from "../../models/image.model";
import path from "path";
import fs from "fs";
import formidable from "formidable";
import { GoogleDriveService } from "../../services/google-drive.service";

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
    this.router.post("/", this.uploadImage);

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

  // postImage = async (request: Request, response: Response) => {
  //   try {
  //     const result = await collections[this.collection].insertOne(
  //       await Image.create(request.body)
  //     );
  //     result
  //       ? response.status(201).send({ data: "Successfully inserted new Image" })
  //       : response.status(400).send({ data: "Failed to insert new Image" });
  //   } catch (error: any) {
  //     Logger.error(error);
  //     response.status(500).send({ data: error.message });
  //   }
  // };

  uploadImage = async (request: Request, response: Response) => {
    const uploadFolder = path.join(
      __dirname,
      `${process.env.PRODUCTION === "true" ? "" : "../../../"}`,
      "files"
    );
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }
    const form = formidable({ multiples: true, uploadDir: uploadFolder });

    /* istanbul ignore next */
    form.parse(request, async (err, fields, files) => {
      if (err) {
        return response.status(400).send({
          data: "There was an error parsing upload files",
        });
      }
      const uploadedFiles: string[] = [];
      for (const key in files) {
        const file: typeof formidable.PersistentFile = files[
          key
        ] as unknown as typeof formidable.PersistentFile;
        fs.renameSync(file["filepath"], path.join(uploadFolder, key));
        uploadedFiles.push(key);
      }

      const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || "";
      const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || "";
      const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || "";
      const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || "";

      const googleDriveService = new GoogleDriveService(
        driveClientId,
        driveClientSecret,
        driveRedirectUri,
        driveRefreshToken
      );

      const id = await googleDriveService.uploadFile(uploadedFiles[0]);

      const jsonFields = JSON.parse(JSON.stringify(fields));
      jsonFields.url = `https://lh3.googleusercontent.com/d/${id}`;

      try {
        const result = await collections[this.collection].insertOne(
          new Image(jsonFields)
        );
        result
          ? response
              .status(201)
              .send({ data: "Successfully inserted new Image" })
          : response.status(400).send({ data: "Failed to insert new Image" });
      } catch (error: any) {
        Logger.error(error);
        response.status(500).send({ data: error.message });
      }
    });
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
