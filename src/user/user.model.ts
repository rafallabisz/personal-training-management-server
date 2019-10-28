import mongoose, { Schema } from "mongoose";
import { User } from "./user.interface";

const dataSchema = new Schema({
  age: Number,
  city: String
});

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  isTrainer: Boolean,
  password: String,
  data: dataSchema
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
