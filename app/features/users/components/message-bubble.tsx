import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { cn } from '~/lib/utils'

interface MessageBubbleProps {
  content: string
  avatarUrl?: string
  fallback?: string
  isCurrentUser?: boolean
}

export function MessageBubble({ content, avatarUrl, fallback, isCurrentUser = false }: MessageBubbleProps) {
  return (
    <div className={cn('flex items-end gap-4', isCurrentUser ? 'flex-row-reverse' : '')}>
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div
        className={cn({
          'bg-accent rounded-md p-4 text-sm w-1/4': true,
          'bg-accent rounded-bl-none': !isCurrentUser,
          'bg-primary text-primary-foreground rounded-br-none': isCurrentUser,
        })}>
        <p>{content}</p>
      </div>
    </div>
  )
}
