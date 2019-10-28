import mongoose, { Schema } from "mongoose";
import User from "./user.interface";

const userSchema = new Schema({
  email: String,
  name: String,
  password: String
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
