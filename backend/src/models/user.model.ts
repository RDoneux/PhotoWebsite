import { Document } from "mongodb";
import { model, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
}

export const UserSchema: Schema = new Schema({
  username: String,
  password: String,
});

export default model<IUser>("User", UserSchema);
