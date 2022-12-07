import { ObjectId } from "mongodb";

export default class Collection {
  constructor(private _id: ObjectId, private images: ObjectId[]) {}
}
