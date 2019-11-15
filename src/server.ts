import "dotenv/config";
import App from "./app";
import PostController from "./post/post.controller";
import validateEnv from "./utils/validateEnv";
import AuthenticationController from "./authentication/authentication.controller";
import UserController from "./user/user.controller";
import CommentController from "./comments/comment.controller";
import OfferController from "./offers/offer.controller";

validateEnv();

const app = new App([
  new PostController(),
  new AuthenticationController(),
  new UserController(),
  new CommentController(),
  new OfferController()
]);

app.listen();
