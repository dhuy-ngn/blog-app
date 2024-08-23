import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { ActionFunctionArgs } from '@remix-run/node';
import { Form, redirect, useNavigate } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import AppDataSource from '~/db.server';
import { PostEntity } from '~/db/entities/post.entity';

export default function AddPost() {
  const navigate = useNavigate();
  return (
    <Form method='post'>
      <Card>
        <CardHeader>
          <h2 className='text-2xl font-bold'>Add new Post</h2>
        </CardHeader>
        <CardContent>
          <Label>
            Title
          </Label>
          <Input
              name="title"
              type="text"
              placeholder="Title" />
          <Label>
            Content
          </Label>
          <Textarea
              name="content"
              placeholder="Content" />
        </CardContent>
        <CardFooter className='flex gap-2 w-full justify-end'>
        <Button onClick={ () => navigate(-1) } variant="outline" type="button">
            <XMarkIcon className="size-4 mr-1.5" />
            Cancel
          </Button>
          <Button type="submit">
            <PaperAirplaneIcon className="size-4 mr-1.5" />
            Save
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const postRepository = AppDataSource.getRepository(PostEntity);
  const formData = await request.formData();
  const newPost = Object.fromEntries(formData);

  await postRepository.save(newPost);

  return redirect(`/posts`);
};