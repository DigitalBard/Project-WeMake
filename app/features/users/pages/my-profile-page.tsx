import type { Route } from './+types/my-profile-page'
import { redirect } from 'react-router'

export function loader({ params }: Route.LoaderArgs & { params: { username: string } }) {
  return redirect(`/users/${params.username}`)
}
