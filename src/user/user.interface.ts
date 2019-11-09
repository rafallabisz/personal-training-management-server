export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isTrainer: boolean;
  password: string;
  offers?: [
    {
      description: string;
    }
  ];
  data?: {
    age: number;
    city: string;
    phone: number;
  };
}

// export interface Description {
//   description: string;
// }
// export interface OfferArr {
//   offers: Description[];
// }

export interface OfferDescription {
  description: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  isTrainer: boolean;
  password: string;
}

export interface LogIn {
  email: string;
  password: string;
}
