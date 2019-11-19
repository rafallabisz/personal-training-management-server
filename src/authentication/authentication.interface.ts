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
