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
  gender: {
    type: String,
    enum: ["male", "female"]
  },
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
  ]
});
const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);
export default userModel;
