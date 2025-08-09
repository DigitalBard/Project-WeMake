import type { ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { SidebarMenuItem, SidebarMenuButton } from '~/common/components/ui/sidebar'
import { Link, useLocation } from 'react-router'

interface MessageCardProps {
  id: string
  avatarUrl?: string
  name: string
  message: string
}

export function MessageRoomCard({ id, avatarUrl, name, message }: MessageCardProps) {
  const location = useLocation()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="h-18" asChild isActive={location.pathname === `/my/messages/${id}`}>
        <Link to={`/my/messages/${id}`}>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{name}</span>
              <span className="text-xs text-muted-foreground">{message}</span>
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
