export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  isTrainer: boolean;
  password: string;
  gender: string;
}

export interface LogIn {
  email: string;
  password: string;
}
