import { useOutletContext } from 'react-router'
import type { Route } from './+types/profile-page'
import client from '~/supa-client'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Profile | wemake' }, { name: 'description', content: '사용자 프로필 정보' }]
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  await client.rpc('track_event', {
    event_type: 'profile_view',
    event_data: {
      username: params.username,
    },
  })
  return null
}

export default function ProfilePage() {
  const { headline, bio } = useOutletContext<{ headline: string; bio: string }>()

  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div>
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">{headline}</p>
      </div>
      <div>
        <h4 className="text-lg font-bold">Bio</h4>
        <p className="text-muted-foreground">{bio}</p>
      </div>
    </div>
  )
}
