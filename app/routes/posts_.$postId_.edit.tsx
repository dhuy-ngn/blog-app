import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { Form, Link, redirect, useLoaderData } from '@remix-run/react';
import invariant from "tiny-invariant";
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

export default function EditPost() {
  const post = useLoaderData<PostEntity>();

  return (
    <Form method='post' key={ post.id }>
      <label>
        <span>Title</span>
        <input
          defaultValue={ post.title }
          name="title"
          type="text"
          placeholder="Title"/>
      </label>
      <label>
        <span>Content</span>
        <textarea
          defaultValue={ post.content }
          name="content"
          placeholder="Content"/>
      </label>
      <p>
        <button type="submit">Save</button>
        <Link to={ `/posts/${ post.id }` }>Cancel</Link>
      </p>
    </Form>
  )
}

export const action = async({
  params : {postId},
  request
}: ActionFunctionArgs) => {
  invariant(postId, "Missing postId param");
  const postRepository = AppDataSource.getRepository(PostEntity);
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await postRepository.update(postId, updates);

  return redirect(`/posts/${ postId }`);
}