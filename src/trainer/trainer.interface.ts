export interface Trainer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isTrainer: boolean;
  password: string;
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

