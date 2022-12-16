import { Document } from "mongodb";
import { Schema, model, ObjectId } from "mongoose";

export interface ICollection extends Document {
  images: ObjectId[];
  imageUrl: string;
  title: string;
}

export const CollectionSchema: Schema = new Schema({
  images: [Schema.Types.ObjectId],
  imageUrl: String,
  title: String,
});

export default model<ICollection>("Collection", CollectionSchema);
