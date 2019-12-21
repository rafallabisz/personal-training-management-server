import mongoose, { Schema } from "mongoose";
import { User } from "./user.interface";

const dataSchema = new Schema({
  age: Number,
  city: String,
  phone: Number,
  avatar: String,
  gallery: [String]
});

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  isTrainer: Boolean,
  password: String,
  gender: String,
  data: dataSchema,
  offers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Offer"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservation"
    }
  ]
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);
export default userModel;
