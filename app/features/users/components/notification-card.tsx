import { Card, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Button } from '~/common/components/ui/button'
import { EyeIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

interface NotificationCardProps {
  avatar: string
  fallback: string
  name: string
  message: string
  time: string
  seen: boolean
}

export function NotificationCard({ avatar, fallback, name, message, time, seen }: NotificationCardProps) {
  return (
    <Card className={cn('min-w-[450px]', seen ? '' : 'bg-yellow-500/60')}>
      <CardHeader className="flex flex-row items-center gap-5">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{name}</span>
            <span> {message}</span>
          </CardTitle>
          <small className="text-sm text-muted-foreground">{time}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button variant={'outline'} size="icon">
          <EyeIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
