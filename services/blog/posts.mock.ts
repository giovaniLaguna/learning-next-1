import { Post, PostHeader } from '@/data/blog/post';
import fs from 'fs/promises';

async function getPosts(): Promise<Post[]> {
  const filePath = new URL("file://C:/ArquivosZ/projetos/learning-nextjs/learning-1/services/blog/posts.json");
  console.log(filePath.toString());
  const contents = await fs.readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
  const posts = JSON.parse(contents);

  if(posts[0]) {
    posts[0].content = (new Date()).toISOString();
  }

  return posts;
}

export async function getPostsHeader(): Promise<PostHeader[]> {
  const posts = await getPosts();

  const postHeader = posts.map(post => ({ id: post.id, title: post.title }));

  return postHeader;
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const posts = await getPosts();

  // if (id === 'apareceFuturamente' && !posts.find( p => p.id === 'apareceFuturamente')) {
  //   setTimeout(() => {
  //     posts.push({ title: "apareceFuturamente", content: '', id: 'apareceFuturamente'});
  //     console.log('Adicionado o aparece futuramente');
  //   }, 3000)
  //   console.log('UIA')
  // }
  return posts.find(post => post.id === id)
}

export async function getPostsId(): Promise<string[]> {
  const posts = await getPosts();

  return posts.map( post => post.id );
}
