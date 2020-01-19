import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import { Reservation } from "./reservation.interface";
import ReservationService from "./reservation.service";

class ReservationController implements Controller {
  public path = "/api/reservations";
  public router = Router();
  public reservationService = new ReservationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/:id`)
      .get(this.getReservationsById)
      .post(this.addReservation);
  }

  private getReservationsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const reservations = await this.reservationService.getReservations(id);
      res.json(reservations);
    } catch (err) {
      next(err);
    }
  };

  private addReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const newReservation: Reservation = req.body;
      const reservation = await this.reservationService.addReservation(id, newReservation);
      res.status(201).json(reservation);
      res.status(201);
    } catch (err) {
      next(err);
    }
  };
}

export default ReservationController;
