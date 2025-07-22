import { IdeaCard } from '~/features/ideas/components/idea-card'
import type { Route } from './+types/dashboard-ideas-page'

export const meta: Route.MetaFunction = () => {
  return [{ title: '내 아이디어' }, { name: 'description', content: '내가 작성한 아이디어 목록' }]
}

export default function DashboardIdeasPage() {
  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <IdeaCard
            id={index}
            title="A startup that creates an AI-powered generated personal trainer, deliveering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            viewCount={123}
            createdAt="12 hours ago"
            upvoteCount={12}
          />
        ))}
      </div>
    </div>
  )
}
