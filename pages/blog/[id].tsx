import { Post } from "@/data/blog/post";
import { getPostById, getPostsId } from "@/services/blog/posts.mock";

type PostProps = { post: Post };

export default function BlogPost({ post }: PostProps) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

export async function getStaticPaths() {
  const postId = await getPostsId();

  const paths = postId.map((post) => ({
    params: { id: post },
  }))

  return {
    paths,
    fallback: false
  };
}

type PostStaticProps = { params: {id: string} };
export async function getStaticProps({ params }: PostStaticProps) {
  const post = await getPostById(params.id);

  return {
    props: {
      post,
    },
  };
}
