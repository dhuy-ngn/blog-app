import { Link } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';

interface PostPreviewProps {
  id: number,
  title: string,
  content: string
}

export default function PostPreview({title, content, id}: PostPreviewProps) {
  return (
    <Card>
      <CardHeader className="font-semibold text-2xl text-gray-700">
        {title}
      </CardHeader>
      <CardContent>
        <span className="text-sm text-gray-500">
        { content.slice(0, 30) } 
        { content.length > 30 && '...' }
        </span>
      </CardContent>
      <CardFooter>
        <Link to={ `${id}/edit` } className="text-sm text-gray-700">
          <Button variant="outline">
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}