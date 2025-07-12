import PageHeader from '~/common/components/page-header'
import type { Route } from './+types/teams-page'
import { TeamCard } from '../components/team-card'
import { getTeams } from '../queries'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Teams | wemake' }, { name: 'description', content: '다양한 팀들을 찾아보세요' }]
}

export const loader = async () => {
  const teams = await getTeams({
    limit: 8,
  })

  return { teams }
}

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  const { teams } = loaderData

  return (
    <div className="space-y-20">
      <PageHeader title="Teams" description="Find a team looking for a new member." />
      <div className="grid grid-cols-4 gap-4">
        {teams.map(team => (
          <TeamCard
            id={team.team_id}
            username={team.team_leader.username}
            avatarUrl={team.team_leader.avatar}
            positions={team.roles.split(', ')}
            projectDescription={team.product_description}
          />
        ))}
      </div>
    </div>
  )
}
