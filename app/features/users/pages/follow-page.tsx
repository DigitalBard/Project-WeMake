import { makeSSRClient } from '~/supa-client'
import type { Route } from './+types/follow-page'
import { getLoggedInUserId } from '../queries'
import { toggleFollow } from '../mutations'

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 })
  }

  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)

  await toggleFollow(client, { userId, username: params.username })

  return {
    ok: true,
  }
}
