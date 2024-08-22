import type { LoaderFunctionArgs } from '@remix-run/node';
import { Form, json, Link, useLoaderData } from '@remix-run/react';
import { Like } from 'typeorm';

import AppDataSource from '~/db.server';
import { PostEntity } from '~/db/entities/post.entity';

export const loader = async ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const posts = await findPostWithTitleContaining(q)
  
  return json(posts)
};

export const action = async () => {
  const postRepository = AppDataSource.getRepository(PostEntity);
  const emptyPost = await postRepository.save({
    title: 'New Post',
    content: 'Hello World!'
  });
  return json(emptyPost);
}

async function findPostWithTitleContaining(searchString: string | null) {
  const postRepository = AppDataSource.getRepository(PostEntity);
  if (searchString) {
    const formattedSearchString = searchString.trim();
    return await postRepository.find({
      where: {
        title: Like(`%${formattedSearchString}%`)
      }
    });
  }
  
  return await postRepository.find();
}

export default function PostList() {
  const posts = useLoaderData<PostEntity[]>();

  return (
    <>
      <Form role="search">
        <input
          name="q"
          placeholder='Search posts...'
        />
      </Form>
      <Form method='post'>
        <button className="bg-slate-400 border-2 border-slate-400 text-white rounded-xl px-6 py-4" type='submit'>Add Post</button>
      </Form>
      { posts.length === 0 ? <>No posts yet</> : posts.map((post) => <Link to={`${post.id}`} key={ post.id }>{ post.title } - { post.content }</Link>) }
    </>
  )
}
