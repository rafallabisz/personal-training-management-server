import { Offer } from "../offers/offer.interface";
import { Comment } from "../comments/comment.interface";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isTrainer: boolean;
  password: string;
  data?: PersonalData;
  offers: Offer[];
  comments: Comment[];
}

export interface PersonalData {
  age: number;
  city: string;
  phone: number;
}
