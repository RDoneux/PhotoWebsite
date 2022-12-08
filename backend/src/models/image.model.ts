import { Document } from "mongodb";
import { model, ObjectId, Schema } from "mongoose";
import mongoose from "mongoose";
export interface IImage extends Document {
  title: string;
  author: string;
  date_taken: Date;
  url: string;
  selected: boolean;
  collections: ObjectId[];
}

const ImageSchema: Schema = new Schema({
  title: String,
  author: String,
  date_taken: Date,
  url: String,
  selected: Boolean,
  collections: [Schema.Types.ObjectId],
});

export default model<IImage>("Image", ImageSchema);
