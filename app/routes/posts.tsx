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
  
  return json({q, posts})
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
  const {q, posts} = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex gap-4 my-8">
      <Form role="search" className="flex-1">
        <Input
          name="q"
          placeholder='Search posts...'
          defaultValue={ q || "" }
          type='search'
        />
      </Form>
      <Form method='post'>
        <Link to='/posts/new'>
        <Button type='button'>Add Post</Button>
        </Link>
      </Form>
      </div>
      
      { posts.length === 0
        ? <>No posts yet</>
        : <PostListWrapper posts={ posts }/>
      }
    </>
  )
}
