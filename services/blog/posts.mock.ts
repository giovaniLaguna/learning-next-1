import { Post, PostHeader } from '@/data/blog/post';

const posts: Post[] = [
  { title: "Post1", id: "1", content: '' },
  { title: "Post2", id: "2", content: '' },
  { title: "Post3", id: "3", content: '' },
];

export async function getPostsHeader(): Promise<PostHeader[]> {
  const postHeader = posts.map(post => ({ id: post.id, title: post.title }));

  return postHeader;
}

export async function getPostById(id: string): Promise<Post | undefined> {
  return posts.find(post => post.id === id)
}

export async function getPostsId(): Promise<string[]> {
  return posts.map( post => post.id );
}
