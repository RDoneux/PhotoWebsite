import { model, Schema } from "mongoose";

export interface IUser extends Document {
  imageUrl: string;
  description: string;
}

export const UserSchema: Schema = new Schema({
  imageUrl: String,
  description: String,
});

export default model<IUser>("User", UserSchema);
