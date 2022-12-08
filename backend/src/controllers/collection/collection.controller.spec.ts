import { collections } from "../../services/database.service";
import { Logger } from "../../util/logger";
import { CollectionController } from "./collection.controller";
import { ObjectId } from "mongodb";
import Collection from "../../models/collection.model";

describe("Collection Controller", () => {
  var component: CollectionController;

  beforeEach(() => {
    jest.resetAllMocks();
    component = new CollectionController();
    collections["collection"] = undefined;
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
      collections["collection"] = {
        find: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockReturnValue([{ value: "test-value" }]),
      };
      await component.getAllCollections(req, res);
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
      await component.getAllCollections(req, res);
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
      collections["collection"] = {
        findOne: jest.fn().mockReturnValue({ message: "test" }),
      };
      await component.getCollection(req, res);
      expect(collections["collection"].findOne).toHaveBeenCalledWith({
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
      collections["collection"] = {
        findOne: jest.fn().mockReturnValue(undefined),
      };
      await component.getCollection(req, res);
      expect(collections["collection"].findOne).toHaveBeenCalledWith({
        _id: new ObjectId(req.params.id),
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        data: `collection with id ${req.params.id} not found`,
      });
    });
    it("should provide 500 response with given body for specific record", async () => {
      const req: any = { params: { id: "638132d301a49efc7d2f542e" } };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      jest.spyOn(Logger, "error");
      await component.getCollection(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });

  describe("GET (with images)", () => {
    it("should provide 200 response with given body for specific record which includes referrencded images", async () => {
      const req: any = { params: { id: "638132d301a49efc7d2f542e" } };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      collections["collection"] = {
        aggregate: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockReturnValue([{ value: "test-value" }]),
      };
      await component.getCollectionImages(req, res);
      expect(collections["collection"].aggregate).toHaveBeenCalledWith([
        { $match: { _id: new ObjectId(req.params.id) } },
        {
          $lookup: {
            from: "image",
            localField: "images",
            foreignField: "_id",
            as: "images",
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
      collections["collection"] = {
        aggregate: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockReturnValue(undefined),
      };
      await component.getCollectionImages(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        data: `collection with id ${req.params.id} not found`,
      });
    });
    it("should provide 500 response with given body for specific record", async () => {
      const req: any = { params: { id: "638132d301a49efc7d2f542e" } };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      jest.spyOn(Logger, "error");
      await component.getCollectionImages(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });

  describe("POST", () => {
    it("should provide response with given body", async () => {
      const req: any = { body: { test: "test-body" } };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["collection"] = {
        insertOne: jest.fn().mockReturnValue(true),
      };
      jest.spyOn(Collection, "create").mockImplementation();
      await component.postCollection(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: "Successfully inserted new Collection",
      });
    });
    it("should provide 400 response when unable to insert item", async () => {
      const req: any = { body: { test: "test-body" } };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["collection"] = {
        insertOne: jest.fn().mockReturnValue(undefined),
      };
      //   jest.spyOn(Collection, "create").mockImplementation();
      await component.postCollection(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        data: "Failed to insert new Collection",
      });
    });
    it("should provide 500 response with given body", async () => {
      const req: any = { body: { test: "test-body" } };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(Logger, "error");
      //   jest.spyOn(Collection, "create").mockImplementation();
      await component.postCollection(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });

  describe("'PATCH'", () => {
    it("should provide 200 response with given body", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
        body: { test: "body" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["collection"] = {
        updateOne: jest.fn().mockReturnValue(true),
      };
      await component.patchCollection(req, res);
      expect(collections["collection"].updateOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: `Successfully updated collection with id: ${req.params.id}`,
      });
    });
    it("should provide 400 response if result is not found", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
        body: { test: "body" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["collection"] = {
        updateOne: jest.fn().mockReturnValue(false),
      };
      await component.patchCollection(req, res);
      expect(collections["collection"].updateOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        data: `Failed to update collection with id: ${req.params.id}`,
      });
    });
    it("should provide 500 response when error", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
        body: { test: "body" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(Logger, "error");
      await component.patchCollection(req, res);
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
      collections["collection"] = {
        deleteOne: jest.fn().mockReturnValue({ deletedCount: 1 }),
      };
      await component.deleteCollection(req, res);
      expect(collections["collection"].deleteOne).toHaveBeenCalledWith({
        _id: new ObjectId(req.params.id),
      });
      expect(res.status).toHaveBeenCalledWith(202);
      expect(res.send).toHaveBeenCalledWith({
        data: `Successfully deleted Collection with id ${req.params.id}`,
      });
    });
    it("should provide 400 response with given body", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["collection"] = {
        deleteOne: jest.fn().mockReturnValue(false),
      };
      await component.deleteCollection(req, res);
      expect(collections["collection"].deleteOne).toHaveBeenCalledWith({
        _id: new ObjectId(req.params.id),
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        data: `Failed to delete Collection with id ${req.params.id}`,
      });
    });
    it("should provide 404 response with given body", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      collections["collection"] = {
        deleteOne: jest.fn().mockReturnValue({ deletedCount: 0 }),
      };
      await component.deleteCollection(req, res);
      expect(collections["collection"].deleteOne).toHaveBeenCalledWith({
        _id: new ObjectId(req.params.id),
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        data: `Failed to delete Collection with id: ${req.params.id} because it doesn't exist`,
      });
    });
    it("should provide 500 response when error", async () => {
      const req: any = {
        params: { id: "6381332d9c2e919b443a2239" },
      };
      const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(Logger, "error");
      await component.deleteCollection(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(Logger.error).toHaveBeenCalled();
    });
  });
});
