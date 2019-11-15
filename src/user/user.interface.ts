export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isTrainer: boolean;
  password: string;
  // offers?: [
  //   {
  //     _id: string;
  //     description: string;
  //   }
  // ];
  data?: {
    age: number;
    city: string;
    phone: number;
  };
  offers: [
    {
      description: string;
    }
  ];

  comments: [
    {
      author: string;
      content: string;
      rating: number;
    }
  ];
}
// export interface OfferDescription {
//   description: string;
// }

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
