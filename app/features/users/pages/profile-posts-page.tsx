import { PostCard } from '~/features/community/components/post-card'
import type { Route } from './+types/profile-posts-page'

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <PostCard
          key={index}
          id={`postId-${index}`}
          title={`Discussion Title ${index}`}
          author={`Author ${index}`}
          avatarUrl={`https://github.com/apple.png`}
          category={`Category ${index}`}
          createdAt={`12 hours ago`}
          expanded
        />
      ))}
    </div>
  )
}
