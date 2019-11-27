import mongoose, { Schema } from "mongoose";
import { Reservation } from "./reservation.interface";

const reservationSchema = new Schema({
  firstName: String,
  lastName: String,
  selectTrainingType: String,
  reserveDate: Date,
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const reservationModel = mongoose.model<Reservation & mongoose.Document>("Reservation", reservationSchema);

export default reservationModel;
