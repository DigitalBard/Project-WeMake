import type { Route } from './+types/notifications-page'
import { NotificationCard } from '../components/notification-card'

export const meta: Route.MetaFunction = () => {
  return [{ title: '알림' }, { name: 'description', content: '알림 목록' }]
}

export default function NotificationsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        <NotificationCard
          avatar="https://github.com/stevejobs.png"
          fallback="S"
          name="Steve Jobs"
          message="followed you."
          time="10 minutes ago"
          seen={false}
        />
      </div>
    </div>
  )
}
