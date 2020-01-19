import "dotenv/config";
import App from "./app";
import validateEnv from "./utils/validateEnv";
import AuthenticationController from "./authentication/authentication.controller";
import TrainerController from "./trainer/trainer.controller";
import CommentController from "./comments/comment.controller";
import OfferController from "./offers/offer.controller";
import UserController from "./user/user.controller";
import ReservationController from "./reservations/reservation.controller";

validateEnv();

const app = new App([
  new AuthenticationController(),
  new TrainerController(),
  new CommentController(),
  new OfferController(),
  new UserController(),
  new ReservationController()
]);

app.listen();
