export interface Post {
  id: string;
  title: string;
  content: string;
}

export type PostHeader = Omit<Post, 'content'>;