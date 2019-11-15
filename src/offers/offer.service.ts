import userModel from "../user/user.model";
import offerModel from "./offer.model";
import { NewOffer } from "./offer.interface";
import HttpException from "../exceptions/HttpException";

class OfferService {
  private offer = offerModel;
  private user = userModel;

  // public getTrainerOffer = async (trainerId: string) => {
  //   const trainer = await this.user.findById(trainerId).populate("comments");
  //   return trainer;
  // };

  public newTrainerOffer = async (trainerId: string, newOffer: NewOffer) => {
    try {
      //create newOffer
      const offer = new this.offer(newOffer);
      //get trainer
      const trainer = await this.user.findById(trainerId);
      if (trainer) {
        //assign trainer as offer trainer
        // offer.trainer = trainer;
        // await offer.save();
        //add comment to the trainer comments array 'comments'
        trainer.offers.push(offer);
        await trainer.save();
        return trainer.offers;
      }
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  };
}

export default OfferService;
