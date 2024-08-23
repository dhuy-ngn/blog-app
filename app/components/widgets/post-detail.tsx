import { Link, useNavigate } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
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
      <CardContent>
        <span className="text-sm text-gray-500">
          { content }
        </span>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2 justify-between items-center">
          <Button variant="ghost" onClick={ () => navigate(-1) }>
            Back
          </Button>
          <div className='flex gap-2'>
            <Link to={ `/posts/${id}/destroy` } className="text-sm text-gray-700">
              <Button variant="ghost" className='text-red-500 hover:bg-red-500 hover:text-white'>
                Delete
              </Button>
            </Link>
            <Link to={ `/posts/${id}/edit` } className="text-sm text-gray-700">
              <Button variant="outline">
                Edit
              </Button>
            </Link>
          </div>

        </div>
      </CardFooter>
    </Card>
  );
}