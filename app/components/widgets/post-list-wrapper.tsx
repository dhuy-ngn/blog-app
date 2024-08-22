import PostPreview from '~/components/widgets/post-preview';
import type { PostEntity } from '~/db/entities/post.entity';

interface PostListWrapperProps {
  posts: PostEntity[]
}

export default function PostListWrapper({ posts }: PostListWrapperProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      { posts.map((post: PostEntity) =>
        <PostPreview
          key={ post.id }
          title={ post.title }
          content={ post.content }
          id={ post.id }
        />) }
    </div>
  )
}