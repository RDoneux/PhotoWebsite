import { collections } from "../../services/database.service";
import { Logger } from "../../util/logger";
import { ObjectId } from "mongodb";
import { ImageController } from "./image.controller";
import * as imageService from "../../services/image.service";

describe("Image Controller", () => {
  var component: ImageController;

  beforeEach(() => {
    jest.resetAllMocks();
    component = new ImageController();
    collections["image"] = undefined;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initalise routes", () => {
    jest.spyOn(component.router, "get");
    jest.spyOn(component.router, "use");
    jest.spyOn(component.router, "post");
    jest.spyOn(component.router, "patch");
    jest.spyOn(component.router, "delete");

    component.initaliseRoutes();

    expect(component.router.get).toHaveBeenCalledTimes(3);
    expect(component.router.use).toHaveBeenCalledTimes(1);
    expect(component.router.post).toHaveBeenCalledTimes(1);
    expect(component.router.patch).toHaveBeenCalledTimes(1);
    expect(component.router.delete).toHaveBeenCalledTimes(1);
  });

  describe("GET (all)", () => {
    it("should provide 200 response with given body for all records", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["image"] = {
        find: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockReturnValue([{ value: "test-value" }]),
      };
      await component.getAllImages(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: [{ value: "test-value" }],
      });
    });
    it("should provide 500 response when unable to connect to db for all records", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      jest.spyOn(Logger, "error");
      await component.getAllImages(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });

  describe("GET (specific)", () => {
    it("should provid 200 response with given body for specific record", async () => {
      const req: any = { params: { id: "638132d301a49efc7d2f542e" } };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["image"] = {
        findOne: jest.fn().mockReturnValue({ message: "test" }),
      };
      await component.getImageById(req, res);
      expect(collections["image"].findOne).toHaveBeenCalledWith({
        _id: new ObjectId(req.params.id),
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ data: { message: "test" } });
    });
    it("should provide 404 response with given body for specific record", async () => {
      const req: any = { params: { id: "638132d301a49efc7d2f542e" } };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["image"] = {
        findOne: jest.fn().mockReturnValue(undefined),
      };
      await component.getImageById(req, res);
      expect(collections["image"].findOne).toHaveBeenCalledWith({
        _id: new ObjectId(req.params.id),
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        data: `image with id ${req.params.id} not found`,
      });
    });
    it("should provide 500 response with given body for specific record", async () => {
      const req: any = { params: { id: "638132d301a49efc7d2f542e" } };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      jest.spyOn(Logger, "error");
      await component.getImageById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });

  describe("GET (with collections)", () => {
    it("should provide 200 response with given body for specific record which includes referrenced image", async () => {
      const req: any = { params: { id: "638132d301a49efc7d2f542e" } };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["image"] = {
        aggregate: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockReturnValue([{ value: "test-value" }]),
      };
      await component.getImageCollections(req, res);
      expect(collections["image"].aggregate).toHaveBeenCalledWith([
        { $match: { _id: new ObjectId(req.params.id) } },
        {
          $lookup: {
            from: "collection",
            localField: "collections",
            foreignField: "_id",
            as: "collections",
          },
        },
        { $limit: 1 },
      ]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ data: { value: "test-value" } });
    });
    it("should provide 404 response with given body for specific record", async () => {
      const req: any = { params: { id: "638132d301a49efc7d2f542e" } };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["image"] = {
        aggregate: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockReturnValue(undefined),
      };
      await component.getImageCollections(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        data: `image with id ${req.params.id} not found`,
      });
    });
    it("should provide 500 response with given body for specific record", async () => {
      const req: any = { params: { id: "638132d301a49efc7d2f542e" } };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      jest.spyOn(Logger, "error");
      await component.getImageCollections(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });

  describe("POST", () => {
    it("should provide 201 response with given body", async () => {
      const req: any = { files: [{ originalname: "test-file-name" }] };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["image"] = {
        insertOne: jest.fn().mockReturnValue(true),
      };
      jest.spyOn(imageService, "uploadToGoogleDrive").mockImplementation();
      await component.uploadImage(req, res);

      expect(imageService.uploadToGoogleDrive).toHaveBeenCalledWith(
        "test-file-name"
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: {
          message: "Successfully uploaded 1 Image(s)",
          fileNames: ["test-file-name"],
        },
      });
    });
    it("should provide 400 response with given body", async () => {
      const req: any = { files: [] };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["image"] = {
        insertOne: jest.fn().mockReturnValue(true),
      };
      jest.spyOn(imageService, "uploadToGoogleDrive").mockImplementation();
      await component.uploadImage(req, res);

      expect(imageService.uploadToGoogleDrive).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        data: "no files attached",
      });
    });
    it("should provide 500 response with given body", async () => {
      const req: any = { files: [{ originalname: "test-file-name" }] };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      jest.spyOn(Logger, "error");
      await component.uploadImage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
    it("should provide 400 response with given body", async () => {
      const req: any = { files: [{ originalname: "test-file-name" }] };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["image"] = {
        insertOne: jest.fn().mockReturnValue(false),
      };
      jest.spyOn(imageService, "uploadToGoogleDrive").mockImplementation();
      await component.uploadImage(req, res);

      expect(imageService.uploadToGoogleDrive).toHaveBeenCalledWith(
        "test-file-name"
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        data: "Failed to upload new Image",
      });
    });
  });

  describe("'PATCH'", () => {
    it("should provide 200 response with given body", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
        body: { test: "body" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["image"] = {
        updateOne: jest.fn().mockReturnValue(true),
      };
      await component.patchImage(req, res);
      expect(collections["image"].updateOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: `Successfully updated Image with id: ${req.params.id}`,
      });
    });
    it("should provide 400 response if result is not found", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
        body: { test: "body" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["image"] = {
        updateOne: jest.fn().mockReturnValue(false),
      };
      await component.patchImage(req, res);
      expect(collections["image"].updateOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        data: `Failed to update Image with id: ${req.params.id}`,
      });
    });
    it("should provide 500 response when error", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
        body: { test: "body" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(Logger, "error");
      await component.patchImage(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });

  describe("DELETE", () => {
    it("should provide 202 response with given body", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["image"] = {
        deleteOne: jest.fn().mockReturnValue({ deletedCount: 1 }),
      };
      await component.deleteImage(req, res);
      expect(collections["image"].deleteOne).toHaveBeenCalledWith({
        _id: new ObjectId(req.params.id),
      });
      expect(res.status).toHaveBeenCalledWith(202);
      expect(res.send).toHaveBeenCalledWith({
        data: `Successfully deleted Image with id ${req.params.id}`,
      });
    });
    it("should provide 400 response with given body", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["image"] = {
        deleteOne: jest.fn().mockReturnValue(false),
      };
      await component.deleteImage(req, res);
      expect(collections["image"].deleteOne).toHaveBeenCalledWith({
        _id: new ObjectId(req.params.id),
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        data: `Failed to delete Image with id ${req.params.id}`,
      });
    });
    it("should provide 404 response with given body", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["image"] = {
        deleteOne: jest.fn().mockReturnValue({ deletedCount: 0 }),
      };
      await component.deleteImage(req, res);
      expect(collections["image"].deleteOne).toHaveBeenCalledWith({
        _id: new ObjectId(req.params.id),
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        data: `Failed to delete Image with id: ${req.params.id} because it doesn't exist`,
      });
    });
    it("should provide 500 response when error", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(Logger, "error");
      await component.deleteImage(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });
});
