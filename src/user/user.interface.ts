import { Offer } from "../offers/offer.interface";
import { Comment } from "../comments/comment.interface";
import { Reservation } from "reservations/reservation.interface";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isTrainer: boolean;
  password: string;
  gender: string;
  data?: PersonalData;
  offers: Offer[];
  comments: Comment[];
  reservations: Reservation[];
}

export interface PersonalData {
  age: number;
  city: string;
  phone: number;
}
