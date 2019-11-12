export interface Comment {
  author: string;
  content: string;
  rating: number;
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
}
