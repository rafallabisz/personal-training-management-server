import { Request } from "express";
import { Trainer } from "../trainer/trainer.interface";

interface RequestWithUser extends Request {
  user: Trainer;
}
export default RequestWithUser;
