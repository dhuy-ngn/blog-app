import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Form, Link, useNavigate } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { cn } from '~/lib/utils';

interface PostDetailProps {
  id: number,
  title: string,
  content: string,
  className?: string;
}

export default function PostDetail({ title, content, id, className }: PostDetailProps) {
  const navigate = useNavigate();
  return (
    <Card className={ cn(className) }>
      <CardHeader className="font-semibold text-2xl text-gray-700">
        { title }
      </CardHeader>
      <Separator className='my-4'/>
      <CardContent>
        <span className="text-sm text-gray-500">
          { content }
        </span>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2 justify-between items-center">
          <Button variant="ghost" onClick={ () => navigate(-1) }>
            <ArrowLeftIcon className='size-4 mr-1.5' />
            Back
          </Button>
          <div className='flex gap-2'>
            <Form action="destroy" method="post" className="text-sm text-gray-700">
              <Button variant="ghost" className='text-red-500 hover:bg-red-500 hover:text-white'>
                <TrashIcon className='size-4 mr-1.5' />
                Delete
              </Button>
            </Form>
            <Link to={ `/posts/${id}/edit` } className="text-sm text-gray-700">
              <Button variant="outline">
                <PencilIcon className='size-4 mr-1.5' />
                Edit
              </Button>
            </Link>
          </div>

        </div>
      </CardFooter>
    </Card>
  );
}