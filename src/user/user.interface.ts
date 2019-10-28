export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isTrainer: boolean;
  password: string;
  data?: {
    age: number;
    city: string;
  };
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
