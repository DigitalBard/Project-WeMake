import { StarIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { DateTime } from 'luxon'

interface ReviewCardProps {
  avatarUrl: string | null
  name: string
  username: string
  rating: number
  content: string
  createdAt: string
}

export function ReviewCard({ avatarUrl, name, username, rating, content, createdAt }: ReviewCardProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{name[0]}</AvatarFallback>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
        </Avatar>
        <div>
          <h4 className="text-lg font-bold">{name}</h4>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
      </div>
      <div className="flex">
        {Array.from({ length: rating }).map((_, index) => (
          <StarIcon key={index} className="size-4 text-yellow-400" fill="currentColor" />
        ))}
        {Array.from({ length: 5 - rating }).map((_, index) => (
          <StarIcon key={index} className="size-4 text-yellow-400" fill="none" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{content}</p>
      <span className="text-xs text-muted-foreground">{DateTime.fromISO(createdAt, { zone: 'utc' }).toRelative()}</span>
    </div>
  )
}
