import type { Route } from './+types/my-profile-page'
import { redirect } from 'react-router'

export function loader() {
  return redirect(`/users/nico`)
}
