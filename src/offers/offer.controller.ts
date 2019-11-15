import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import { NewOffer } from "./offer.interface";
import OfferService from "./offer.service";

class OfferController implements Controller {
  public path = "/trainer";
  public router = Router();
  public offerService = new OfferService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/:trainerId/offers`)
      .get(this.getTrainerOffers)
      .post(this.newTrainerOffer);
  }

  private getTrainerOffers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { trainerId } = req.params;
      const offers = await this.offerService.getTrainerOffers(trainerId);
      res.json(offers);
    } catch (err) {
      next(err);
    }
  };

  private newTrainerOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { trainerId } = req.params;
      const newOffer: NewOffer = req.body;
      const offer = await this.offerService.newTrainerOffer(trainerId, newOffer);

      res.status(201).json(offer);
    } catch (err) {
      next(err);
    }
  };

  // private deleteTrainerOffer = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { trainerId } = req.params;
  //     const offer = await this.offerService.deleteTrainerOffer(trainerId);

  //     res.status(200).json(offer);
  //   } catch (err) {
  //     next(err);
  //   }
  // };
}

export default OfferController;
