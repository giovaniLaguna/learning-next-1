import Layout from "@/components/layout";
import { Post } from "@/data/blog/post";
import { getPostsHeader } from "@/services/blog/posts.mock";
import Link from "next/link";
import { PostHeader } from "../../data/blog/post";
import { NextPageWithLayout } from "../_app";

type PostProps = { posts: PostHeader[] };

const Blog: NextPageWithLayout<PostProps> = ({ posts }) => {
  console.log(posts);
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

Blog.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Blog;

/**
 * @description este método roda no momento de compilação da pagina
 * e não é servido ao frontend
 */
export async function getStaticProps() {
  console.log("Getting mocked posts");
  const posts = await getPostsHeader();

  return {
    props: {
      posts,
    },
    revalidate: 10
  };
}
