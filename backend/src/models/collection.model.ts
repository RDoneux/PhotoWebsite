import { Document } from "mongodb";
import { Schema, model, ObjectId } from "mongoose";
import mongoose from "mongoose";

export interface ICollection extends Document {
  images: ObjectId[];
}

export const CollectionSchema: Schema = new Schema({
  images: [Schema.Types.ObjectId],
});

export default model<ICollection>("Collection", CollectionSchema);
