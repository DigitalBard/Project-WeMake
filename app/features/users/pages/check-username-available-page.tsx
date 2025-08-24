import { makeSSRClient } from '~/supa-client'
import type { Route } from './+types/check-username-available-page'
import { getLoggedInUserId, isUsernameAvailable } from '../queries'

export const action = async ({ request }: Route.ActionArgs) => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 })
  }

  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)
  const formData = await request.formData()
  const username = formData.get('username') as string
  const isAvailable = await isUsernameAvailable(client, { username, userId })
  return { isAvailable }
}
