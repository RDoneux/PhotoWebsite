import { Document, model, Schema } from "mongoose";

export interface IMessage extends Document {
  contact_email: string;
  subject: string;
  message: string;
}

export const MessageSchema: Schema = new Schema({
  contact_email: String,
  subject: String,
  message: String,
});

export default model<IMessage>("Message", MessageSchema);
