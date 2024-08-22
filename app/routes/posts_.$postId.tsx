import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
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

export default function Post() {
  const post = useLoaderData<PostEntity>();
  
  return (
    <>
      <h1>{post.title}</h1>
      <p>{ post.content }</p>
      
      <Form
        action="destroy"
        method="post"
        onSubmit={ (e) => {
          const response = confirm("Are you sure you want to delete this post?");

          if (!response) {
            e.preventDefault();
          }
        } }>
        <button type="submit">Delete</button>
        </Form>
    </>
  )
}
