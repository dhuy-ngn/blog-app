import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from "tiny-invariant";
import PostDetail from '~/components/widgets/post-detail';
import AppDataSource from '~/db.server';
import { PostEntity } from '~/db/entities/post.entity';

export const loader = async ({ params: { postId } }: LoaderFunctionArgs) => {
  invariant(postId, "Missing postId param");

  const postRepository = AppDataSource.getRepository(PostEntity);
  const post = await postRepository.findOneBy({ id: Number(postId) });

  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  return json(post)
};

export default function Post() {
  const post = useLoaderData<PostEntity>();
  
  return (
    <>
      <PostDetail id={ post.id } title={ post.title } content={ post.content }/>
    </>
  )
}
