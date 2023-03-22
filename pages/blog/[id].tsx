import { Post } from "@/data/blog/post";
import { getPostById, getPostsId } from "@/services/blog/posts.mock";
import { Router, useRouter } from "next/router";
import { useEffect } from "react";
import styles from '@/styles/Home.module.css';

type PostProps = { post: Post };

export default function BlogPost({ post }: PostProps) {
  const router = useRouter();

  // Quando uma parte da aplicação esta sendo 
  if(!post) {
    return <span style={{ 'backgroundColor': 'red' }}>Loading</span>
  }

  return (
    <>
      <a onClick={() => router.back()}>Go back</a>
      <article>
        <h1>{post.title}</h1>
        <div>{post.content}</div>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const postId = await getPostsId();

  const paths = postId.map((post) => ({
    params: { id: post },
  })).filter((_, i) => i === 0);

  return {
    paths,
    fallback: true,
  };
}

type PostStaticProps = { params: { id: string } };
export async function getStaticProps({ params }: PostStaticProps) {
  const post = await getPostById(params.id);

  console.log("IIID", post);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 50,
  };
}
