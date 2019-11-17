import mongoose, { Schema } from "mongoose";
import { Trainer } from "./trainer.interface";

const dataSchema = new Schema({
  age: Number,
  city: String,
  phone: Number
});

const trainerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  isTrainer: Boolean,
  password: String,
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
const trainerModel = mongoose.model<Trainer & mongoose.Document>("Trainer", trainerSchema);
export default trainerModel;
