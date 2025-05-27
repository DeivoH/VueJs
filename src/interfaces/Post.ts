export interface Post {
  userName: string;
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type Posts = Array<Post>;
