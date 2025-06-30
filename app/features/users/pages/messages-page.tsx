import { MessageCircleIcon } from 'lucide-react'
import type { Route } from './+types/messages-page'

export const meta: Route.MetaFunction = () => {
  return [{ title: '메시지' }, { name: 'description', content: '메시지 목록' }]
}

export default function MessagesPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
      <MessageCircleIcon className="size-12 text-muted-foreground" />
      <h1 className="text-xl text-muted-foreground font-semibold">Click on a message in the sidebar to view it.</h1>
    </div>
  )
}
