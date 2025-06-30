import PageHeader from '~/common/components/page-header'
import type { Route } from './+types/ideas-page'
import { IdeaCard } from '../components/idea-card'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'IdeasGPT | wemake' }, { name: 'description', content: 'Find ideas for your next project' }]
}

export default function IdeasPage() {
  return (
    <div className="space-y-20">
      <PageHeader title="IdeasGPT" description="Find ideas for your next project" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            id="ideaId"
            title="A startup that creates an AI-powered generated personal trainer, deliveering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            viewCount={123}
            createdAt="12 hours ago"
            upvoteCount={12}
            isClaimed={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  )
}
