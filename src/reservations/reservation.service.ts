import HttpException from "../exceptions/HttpException";
import reservationModel from "./reservation.model";
import { Reservation } from "./reservation.interface";
import userModel from "../user/user.model";

class ReservationService {
  private reservation = reservationModel;
  private user = userModel;

  public getReservations = async (id: string) => {
    const person = await this.user.findById(id).populate("reservations");
    const reservations = person!.reservations;
    return reservations;
  };

  public addReservation = async (id: string, reservation: Reservation) => {
    try {
      const newReservation = new this.reservation(reservation);
      const person = await this.user.findById(id);
      if (person) {
        newReservation.trainer = person;
        await newReservation.save();
        person.reservations.push(newReservation);
        await person.save();
        return person;
      }
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  };
}

export default ReservationService;
