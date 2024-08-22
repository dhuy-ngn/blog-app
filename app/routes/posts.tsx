import type { LoaderFunctionArgs } from '@remix-run/node';
import { Form, json, Link, useLoaderData } from '@remix-run/react';
import { Like } from 'typeorm';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import PostListWrapper from '~/components/widgets/post-list-wrapper';

import AppDataSource from '~/db.server';
import { PostEntity } from '~/db/entities/post.entity';

export const loader = async ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const posts = await findPostWithTitleContaining(q)
  
  return json(posts)
};

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
        <Input
          name="q"
          placeholder='Search posts...'
        />
      </Form>
      <Form method='post'>
        <Link to='/posts/new'>
        <Button type='button'>Add Post</Button>
        </Link>
      </Form>
      { posts.length === 0
        ? <>No posts yet</>
        : <PostListWrapper posts={ posts }/>
      }
    </>
  )
}
