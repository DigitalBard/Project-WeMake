import PageHeader from '~/common/components/page-header'
import type { Route } from './+types/teams-page'
import { TeamCard } from '../components/team-card'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Teams | wemake' }, { name: 'description', content: '다양한 팀들을 찾아보세요' }]
}

export default function TeamsPage() {
  return (
    <div className="space-y-20">
      <PageHeader title="teams" description="Find a team looking for a new member." />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <TeamCard
            id="teamId"
            username="lynn"
            avatarUrl="https://github.com/inthetiger.png"
            positions={['React Developer', 'Backend Developer', 'Product Developer']}
            projectDescription="a new social media platform"
          />
        ))}
      </div>
    </div>
  )
}
