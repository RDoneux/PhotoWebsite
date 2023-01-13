import { Document } from "mongodb";
import { model, Schema } from "mongoose";

export interface IAdminDashboard extends Document {
  imageUrl: string;
  description: string;
}

export const AdminDashboardSchema: Schema = new Schema({
  imageUrl: String,
  description: String,
});

export default model<IAdminDashboard>("AdminDashboard", AdminDashboardSchema);
