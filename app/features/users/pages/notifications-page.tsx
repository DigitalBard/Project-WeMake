import type { Route } from './+types/notifications-page'
import { NotificationCard } from '../components/notification-card'
import { makeSSRClient } from '~/supa-client'
import { getLoggedInUserId, getNotifications } from '../queries'

export const meta: Route.MetaFunction = () => {
  return [{ title: '알림' }, { name: 'description', content: '알림 목록' }]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)
  const notifications = await getNotifications(client, { userId })
  return { notifications }
}

export default function NotificationsPage({ loaderData }: Route.ComponentProps) {
  const { notifications } = loaderData
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        {notifications.map(notification => (
          <NotificationCard
            key={notification.notification_id}
            id={notification.notification_id}
            avatar={notification.source?.avatar ?? ''}
            fallback={notification.source?.name?.[0] ?? ''}
            name={notification.source?.name ?? ''}
            username={notification.source?.username ?? ''}
            type={notification.type}
            productName={notification.product?.name ?? ''}
            postTitle={notification.community_post?.title ?? ''}
            payloadId={notification.product?.product_id ?? notification.community_post?.post_id}
            time={notification.created_at}
            seen={notification.seen}
          />
        ))}
      </div>
    </div>
  )
}
