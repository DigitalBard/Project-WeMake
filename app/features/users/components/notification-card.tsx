import { Card, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Button } from '~/common/components/ui/button'
import { EyeIcon } from 'lucide-react'
import { cn } from '~/lib/utils'
import { DateTime } from 'luxon'
import { Link, useFetcher } from 'react-router'

interface NotificationCardProps {
  id: number
  avatar: string
  fallback: string
  name: string
  username: string
  type: 'follow' | 'review' | 'reply' | 'mention'
  productName?: string
  postTitle?: string
  payloadId?: number
  time: string
  seen: boolean
}

export function NotificationCard({
  id,
  avatar,
  fallback,
  name,
  username,
  type,
  productName,
  postTitle,
  payloadId,
  time,
  seen,
}: NotificationCardProps) {
  const getMessage = (type: 'follow' | 'review' | 'reply' | 'mention') => {
    switch (type) {
      case 'follow':
        return 'followed you.'
      case 'review':
        return 'reviewed your product. : '
      case 'reply':
        return 'replied to your post. : '
      case 'mention':
        return 'mentioned you.'
    }
  }

  const fetcher = useFetcher()
  const optimisticSeen = fetcher.state === 'idle' ? seen : true

  return (
    <Card className={cn('min-w-[450px]', optimisticSeen ? '' : 'bg-yellow-500/60')}>
      <CardHeader className="flex flex-row items-center gap-5">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <Button variant={'link'} className="text-lg font-bold m-0 p-0" asChild>
              <Link to={`/users/${username}`}>{name}</Link>
            </Button>
            <span> {getMessage(type)}</span>
            {productName && (
              <Button variant={'link'} asChild>
                <Link to={`/products/${payloadId}`}>{productName}</Link>
              </Button>
            )}
            {postTitle && (
              <Button variant={'link'} asChild>
                <Link to={`/community/${payloadId}`}>{postTitle}</Link>
              </Button>
            )}
          </CardTitle>
          <small className="text-sm text-muted-foreground">
            {DateTime.fromISO(time, { zone: 'utc' }).toRelative()}
          </small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        {!optimisticSeen && (
          <fetcher.Form method="post" action={`/my/notifications/${id}/see`}>
            <Button variant={'outline'} size="icon">
              <EyeIcon className="size-4" />
            </Button>
          </fetcher.Form>
        )}
      </CardFooter>
    </Card>
  )
}
