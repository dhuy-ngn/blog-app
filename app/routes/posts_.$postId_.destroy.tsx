import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from 'react-router';
import invariant from 'tiny-invariant';
import AppDataSource from '~/db.server';
import { PostEntity } from '~/db/entities/post.entity';

export const action = async({params: {postId}}: ActionFunctionArgs) => {
  invariant(postId, "Missing postId param");

  const postRepository = AppDataSource.getRepository(PostEntity);
  await postRepository.delete({ id: Number(postId) }).then(({ affected }) => {
    if (affected === 0) {
      throw new Response("Post not found", {status: 404});
    }
  });

  return redirect("/posts")
}