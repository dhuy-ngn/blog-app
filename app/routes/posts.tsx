import { PlusIcon } from '@heroicons/react/24/outline';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { Form, json, Link, useLoaderData, useSearchParams } from '@remix-run/react';
import { ILike } from 'typeorm';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import PostListWrapper from '~/components/widgets/post-list-wrapper';

import AppDataSource from '~/db.server';
import { PostEntity } from '~/db/entities/post.entity';
import { debounce } from '~/lib/debounce';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const posts = await findPostWithTitleContaining(q);

  return json({ q, posts });
};

async function findPostWithTitleContaining(searchString: string | null) {
  const postRepository = AppDataSource.getRepository(PostEntity);
  if (searchString) {
    const formattedSearchString = searchString.trim().toLowerCase();
    return await postRepository.find({
      where: [
        { title: ILike(`%${formattedSearchString}%`) },
        { content: ILike(`%${formattedSearchString}%`) },
      ]
    });
  }

  return await postRepository.find();
}

export default function PostList() {
  const { posts } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();
    params.set("q", event.target.value);
    setSearchParams(params, { preventScrollReset: true });
  }, 300);

  return (
    <>
      <div className="flex gap-4 my-8">
        <Form role="search" className="flex-1">
          <Input
            name="q"
            placeholder='Search posts...'
            defaultValue={ searchParams.get("q") || "" }
            type='search'
            onChange={ handleSearch }
          />
        </Form>
        <Form method='post'>
          <Link to='/posts/new'>
            <Button type='button'>
              <PlusIcon className='size-4 mr-1.5' />
              Add Post
            </Button>
          </Link>
        </Form>
      </div>

      { posts.length === 0
        ? <>No posts found</>
        : <PostListWrapper posts={ posts } />
      }
    </>
  );
}
