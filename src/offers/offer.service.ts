import trainerModel from "../trainer/trainer.model";
import offerModel from "./offer.model";
import { NewOffer } from "./offer.interface";
import HttpException from "../exceptions/HttpException";

class OfferService {
  private offer = offerModel;
  private user = trainerModel;

  public getTrainerOffers = async (trainerId: string) => {
    const trainer = await this.user.findById(trainerId).populate("offers");
    const offers = trainer!.offers;
    return offers;
  };

  public newTrainerOffer = async (trainerId: string, newOffer: NewOffer) => {
    try {
      const offer = new this.offer(newOffer);
      const trainer = await this.user.findById(trainerId).populate("offers");
      if (trainer) {
        await offer.save();
        trainer.offers.push(offer);
        await trainer.save();
        return trainer.offers;
      }
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  };

  public deleteTrainerOffer = async (trainerId: string, offerId: string) => {
    try {
      const offerDeleted = await this.offer.findOneAndRemove({ _id: offerId });
      await this.user.updateOne({ offers: offerId }, { $pull: { offers: offerId } });
      const offer = await this.getTrainerOffers(trainerId);
      return offer;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  };
}

export default OfferService;
