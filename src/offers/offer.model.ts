import mongoose, { Schema } from "mongoose";
import { Offer } from "./offer.interface";

const offerSchema = new Schema({
  description: String
});

const offerModel = mongoose.model<Offer & mongoose.Document>("Offer", offerSchema);

export default offerModel;
