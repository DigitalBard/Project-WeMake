import { Link } from 'react-router'
import { Button } from '../../../common/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../common/components/ui/card'
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { DateTime } from 'luxon'

interface IdeaCardProps {
  id: number
  title: string
  owner?: boolean
  viewCount?: number
  createdAt?: string
  upvoteCount?: number
  isClaimed?: boolean
}

export function IdeaCard({ id, title, owner, viewCount, createdAt, upvoteCount, isClaimed = false }: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <Link to={isClaimed || owner ? '' : `/ideas/${id}`}>
          <CardTitle className="text-xl">
            <span
              className={cn(
                isClaimed ? 'bg-muted-foreground selection:bg-muted-foreground text-muted-foreground break-all' : ''
              )}>
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      {owner ? null : (
        <CardContent className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>{viewCount}</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span>{createdAt ? DateTime.fromISO(createdAt).toRelative() : null}</span>
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2">
        {!isClaimed && !owner ? (
          <>
            <Button variant="outline">
              <HeartIcon className="w-4 h-4" />
              <span>{upvoteCount}</span>
            </Button>
            <Button asChild>
              <Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
            </Button>
          </>
        ) : (
          <Button variant="outline" disabled className="cursor-not-allowed">
            <LockIcon className="size-4" />
            Claimed
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
