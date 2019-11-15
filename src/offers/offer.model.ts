import mongoose, { Schema } from "mongoose";
import {Offer} from './offer.interface';

const offerSchema = new Schema({
  description:String,
  trainer:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
})

const offerModel = mongoose.model<Offer & mongoose.Document>("Offer", offerSchema);

export default offerModel;
