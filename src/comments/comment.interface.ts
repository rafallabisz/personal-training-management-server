export interface Comment {
  author: string;
  content: string;
  rating: number;
  createdAt: Date;
  avatar: string;
  trainer: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
export interface NewComment {
  author: string;
  content: string;
  rating: number;
  avatar: string;
}
