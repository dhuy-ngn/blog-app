import { Link } from '@remix-run/react';
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
    <Link to={ `${id}` }>
      <Card className={ cn(className) }>
        <CardHeader className="font-semibold text-2xl text-gray-700">
          { title }
        </CardHeader>
        <CardContent>
          <span className="text-sm text-gray-500">
            { content.slice(0, 30) }
            { content.length > 30 && '...' }
          </span>
        </CardContent>
        <CardFooter>
          <div className="flex w-full gap-2 justify-end items-center">
            <Link to={ `${id}/delete` } className="text-sm text-gray-700">
              <Button variant="ghost" className='text-red-500 hover:bg-red-500 hover:text-white'>
                Delete
              </Button>
            </Link>
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
    </Link>

  );
}