export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
  authorId: string;
}

export interface Comment {
  id: string;
  comment: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
  authorId: string;
  postId: string;
}

export interface User {
  email: string;
  uid: string;
  username: string;
}
