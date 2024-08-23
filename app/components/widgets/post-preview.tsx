import { Form, Link } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { cn } from '~/lib/utils';

interface PostPreviewProps {
  id: number,
  title: string,
  content: string,
  className?: string;
}

export default function PostPreview({ title, content, id, className }: PostPreviewProps) {
  return (
    <Card className={ cn(className) }>
      <CardHeader className="font-semibold text-2xl text-gray-700">
        <Link to={ `${id}` } className='hover:underline'>
          { title }
        </Link>
      </CardHeader>
      <CardContent>
        <span className="text-sm text-gray-500">
          { content.slice(0, 30) }
          { content.length > 30 && '...' }
        </span>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2 justify-end items-center">
          <Form method='post' action={ `/posts/${id}/destroy` } className="text-sm text-gray-700">
            <Button type="submit" variant="ghost" className='text-red-500 hover:bg-red-500 hover:text-white'>
              Delete
            </Button>
          </Form>
          <Link to={ `${id}/edit` } className="text-sm text-gray-700">
            <Button variant="outline">
              Edit
            </Button>
          </Link>
          <Link to={ `${id}` } className="text-sm text-gray-700">
            <Button>
              View
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}