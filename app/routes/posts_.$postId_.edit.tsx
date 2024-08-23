import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { Form, redirect, useLoaderData, useNavigate } from '@remix-run/react';
import invariant from "tiny-invariant";
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import AppDataSource from '~/db.server';
import { PostEntity } from '~/db/entities/post.entity';

export const loader = async ({ params: { postId } }: LoaderFunctionArgs) => {
  invariant(postId, "Missing postId param");

  const postRepository = AppDataSource.getRepository(PostEntity);
  const post = await postRepository.findOneBy({ id: Number(postId) });

  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  return json(post);
};

export default function EditPost() {
  const post = useLoaderData<PostEntity>();
  const navigate = useNavigate();

  return (
    <Form method='post'>
      <Card>
        <CardHeader>
          <h2 className='text-2xl font-bold'>Edit Post</h2>
        </CardHeader>
        <CardContent>
          <Label>
            <span>Title</span>
            <Input
              defaultValue={ post.title }
              name="title"
              type="text"
              placeholder="Title" />
          </Label>
          <Label>
            <span>Content</span>
            <Textarea
              defaultValue={ post.content }
              name="content"
              placeholder="Content" />
          </Label>
        </CardContent>
        <CardFooter className="flex gap-2 w-full justify-end">
          <Button type="submit">Save</Button>
          <Button onClick={ () => navigate(-1) } variant="outline" type="button">Cancel</Button>
        </CardFooter>
      </Card>
    </Form>
  );
}

export const action = async ({
  params: { postId },
  request
}: ActionFunctionArgs) => {
  invariant(postId, "Missing postId param");
  const postRepository = AppDataSource.getRepository(PostEntity);
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await postRepository.update(postId, updates);

  return redirect(`/posts/${postId}`);
};