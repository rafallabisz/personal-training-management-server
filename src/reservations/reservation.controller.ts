import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import { Reservation } from "./reservation.interface";
import ReservationService from "./reservation.service";

class ReservationController implements Controller {
  public path = "/trainer";
  public router = Router();
  public reservationService = new ReservationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/:trainerId/reservations`)
      .get(this.getTrainerReservations)
      .post(this.newTrainerReservation);
  }

  private getTrainerReservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { trainerId } = req.params;
      const reservations = await this.reservationService.getTrainerReservations(trainerId);
      res.json(reservations);
    } catch (err) {
      next(err);
    }
  };

  private newTrainerReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { trainerId } = req.params;
      const newReservation: Reservation = req.body;
      const reservation = await this.reservationService.newTrainerReservation(trainerId, newReservation);
      res.status(201).json(reservation);
    } catch (err) {
      next(err);
    }
  };
}

export default ReservationController;
