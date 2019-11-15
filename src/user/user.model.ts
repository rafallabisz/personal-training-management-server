import mongoose, { Schema } from "mongoose";
import { User } from "./user.interface";

const dataSchema = new Schema({
  age: Number,
  city: String,
  phone: Number
});

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  isTrainer: Boolean,
  password: String,
  // offers: [
  //   {
  //     description: String
  //   }
  // ],
  offers:[
    {
      type:Schema.Types.ObjectId,
      ref:"Offer"
    }
  ],
  data: dataSchema,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
