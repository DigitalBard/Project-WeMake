import { forwardRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { cn } from '~/lib/utils'

interface MessageBubbleProps {
  content: string
  avatarUrl?: string
  fallback?: string
  isCurrentUser?: boolean
  isLastMessage: boolean
}

export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ content, avatarUrl, fallback, isCurrentUser = false, isLastMessage }, ref) => {
    return (
      <div
        className={cn('flex items-end gap-4', isCurrentUser ? 'flex-row-reverse' : '')}
        ref={isLastMessage ? ref : null}>
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
)
