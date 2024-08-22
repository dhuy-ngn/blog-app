import { json, useLoaderData } from '@remix-run/react';

import AppDataSource from '~/db.server';
import { PostEntity } from '~/db/entities/post.entity';

export const loader = async () => {
  const postRepository = AppDataSource.getRepository(PostEntity);
  const posts = await postRepository.find();

  return json(posts)
};

export default function PostList() {
  const posts = useLoaderData<PostEntity[]>();

  return (
    <>
      { posts.length === 0 ? <>No posts yet</> : posts.map((post) => <p key={ post.id }>{ post.title } - { post.content }</p>) }
    </>
  )
}
