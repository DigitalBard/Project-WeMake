import { PostCard } from '~/features/community/components/post-card'
import type { Route } from './+types/profile-posts-page'
import { getUserPosts } from '../queries'

export const loader = async ({ params }: Route.LoaderArgs) => {
  const posts = await getUserPosts(params.username)
  return { posts }
}

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData

  return (
    <div className="flex flex-col gap-5">
      {posts.map(post => (
        <PostCard
          key={post.post_id}
          id={post.post_id}
          title={post.title}
          author={post.author}
          avatarUrl={post.author_avatar}
          category={post.topic}
          createdAt={post.created_at}
          expanded
        />
      ))}
    </div>
  )
}
