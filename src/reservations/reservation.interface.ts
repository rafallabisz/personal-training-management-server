export interface Reservation {
  firstName: string;
  lastName: string;
  selectTrainingType: string;
  reserveDate: Date;
  firstNameTrainer: string;
  lastNameTrainer: string;
  trainerPhone: number;
  trainer: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
