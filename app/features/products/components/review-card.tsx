import { StarIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'

interface ReviewCardProps {
  avatarUrl: string
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
          <AvatarImage src={avatarUrl} />
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
      </div>
      <p className="text-sm text-muted-foreground">{content}</p>
      <span className="text-xs text-muted-foreground">{createdAt}</span>
    </div>
  )
}
