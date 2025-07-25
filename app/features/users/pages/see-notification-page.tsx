import { makeSSRClient } from '~/supa-client'
import { getLoggedInUserId, seeNotification } from '../queries'
import type { Route } from './+types/see-notification-page'

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed.', { status: 405 })
  }

  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)
  const { notificationId } = params
  await seeNotification(client, { userId, notificationId })

  return { ok: true }
}
