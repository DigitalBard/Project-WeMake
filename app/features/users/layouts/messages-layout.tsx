import { Outlet, useOutletContext } from 'react-router'
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarProvider } from '~/common/components/ui/sidebar'
import { MessageRoomCard } from '../components/message-room-card'
import { makeSSRClient } from '~/supa-client'
import { getLoggedInUserId, getMessages } from '../queries'
import type { Route } from './+types/messages-layout'

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)
  const messages = await getMessages(client, { userId })
  return { messages }
}

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
  const { messages } = loaderData
  const { userId, name, avatar } = useOutletContext<{ userId: string; name: string; avatar: string }>()

  return (
    <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden min-h-full h-[calc(100vh-14rem)]">
      <Sidebar variant="floating" className="pt-16">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {messages.map(message => (
                <MessageRoomCard
                  key={message.message_room_id}
                  id={message.message_room_id.toString()}
                  name={message.name}
                  message={message.last_message}
                  avatarUrl={message.avatar}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full w-full">
        <Outlet context={{ userId, name, avatar }} />
      </div>
    </SidebarProvider>
  )
}
