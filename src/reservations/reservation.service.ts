import HttpException from "../exceptions/HttpException";
import reservationModel from "./reservation.model";
import { Reservation } from "./reservation.interface";
import userModel from "../user/user.model";

class ReservationService {
  private reservation = reservationModel;
  private user = userModel;

  public getTrainerReservations = async (trainerId: string) => {
    const trainer = await this.user.findById(trainerId).populate("reservations");
    const reservations = trainer!.reservations;
    return reservations;
  };

  public newTrainerReservation = async (trainerId: string, reservation: Reservation) => {
    try {
      //create newComment
      const newReservation = new this.reservation(reservation);
      //get trainer
      const trainer = await this.user.findById(trainerId);

      if (trainer) {
        //assign trainer as comment trainer
        newReservation.trainer = trainer;
        await newReservation.save();
        //add comment to the trainer comments array 'comments'
        trainer.reservations.push(newReservation);
        await trainer.save();
        return trainer;
      }
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  };

  public getUserReservations = async (userId: string) => {
    const user = await this.user.findById(userId).populate("reservations");
    const reservations = user!.reservations;
    return reservations;
  };

  public newUserReservation = async (userId: string, reservation: Reservation) => {
    try {
      //create newComment
      const newReservation = new this.reservation(reservation);
      //get trainer
      const user = await this.user.findById(userId);
      if (user) {
        //assign trainer as comment trainer
        newReservation.trainer = user;
        await newReservation.save();
        //add comment to the trainer comments array 'comments'
        user.reservations.push(newReservation);
        await user.save();
        return user;
      }
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  };
}

export default ReservationService;
