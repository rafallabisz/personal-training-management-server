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
    this.router.route(`${this.path}/:trainerId/offers`).post(this.newTrainerOffer);
  }

  // private getTrainerOffers = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { trainerId } = req.params;
  //     const trainer = await this.offerService.getTrainerComments(trainerId);
  //     const comments = trainer!.comments;
  //     res.json(comments);
  //   } catch (err) {
  //     next(err);
  //   }
  // };

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
}

export default OfferController;
