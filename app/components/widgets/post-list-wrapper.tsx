import { Label } from '~/components/ui/label';
import PostPreview from '~/components/widgets/post-preview';
import type { PostEntity } from '~/db/entities/post.entity';

interface PostListWrapperProps {
  posts: PostEntity[]
}

export default function PostListWrapper({ posts }: PostListWrapperProps) {
  return (
    <section className='flex flex-col gap-4 max-w-7xl'>
      <Label className="text-3xl font-bold">All posts</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        { posts.map((post: PostEntity) =>
          <PostPreview
            className="~w-lg/2xl"
            key={ post.id }
            title={ post.title }
            content={ post.content }
            id={ post.id }
          />) }
      </div>
    </section>
  )
}