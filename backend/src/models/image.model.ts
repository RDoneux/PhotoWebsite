import { ObjectId } from "mongoose";

export default class Image {
  constructor(
    private _id: ObjectId,
    private title: string,
    private author: string,
    private date_taken: Date,
    private url: string,
    private selected: boolean,
    private collections: ObjectId[]
  ) {}
}
