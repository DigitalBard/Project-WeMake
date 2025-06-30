import { Outlet } from 'react-router'
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarProvider } from '~/common/components/ui/sidebar'
import { MessageRoomCard } from '../components/message-room-card'

export default function MessagesLayout() {
  return (
    <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden min-h-full h-[calc(100vh-14rem)]">
      <Sidebar variant="floating" className="pt-16">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 10 }).map((_, index) => (
                <MessageRoomCard
                  key={index}
                  id={`messageId-${index}`}
                  name={`User ${index}`}
                  message={`Last message ${index}`}
                  avatarUrl={`https://github.com/shadcn.png`}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full w-full">
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
