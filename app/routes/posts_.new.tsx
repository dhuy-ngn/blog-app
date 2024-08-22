import type { ActionFunctionArgs } from '@remix-run/node';
import { Form, redirect, useNavigate } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import AppDataSource from '~/db.server';
import { PostEntity } from '~/db/entities/post.entity';

export default function AddPost() {
  const navigate = useNavigate()
  return (
    <Form method='post'>
      <Card>
        <CardHeader>
          <Input name="title" type="text" placeholder="Title"/>
        </CardHeader>
        <CardContent>
          <Textarea name="content" placeholder="Content"/>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
        </CardFooter>
      </Card>
    </Form>
  )
}

export const action = async ({request}: ActionFunctionArgs) => {
  const postRepository = AppDataSource.getRepository(PostEntity);
  const formData = await request.formData();
  const newPost = Object.fromEntries(formData);

  await postRepository.save(newPost);

  return redirect(`/posts`);
}