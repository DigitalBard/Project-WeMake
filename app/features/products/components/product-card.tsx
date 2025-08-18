import { Link, useFetcher } from 'react-router'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../common/components/ui/card'
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from 'lucide-react'
import { Button } from '../../../common/components/ui/button'
import { cn } from '~/lib/utils'

interface ProductCardProps {
  id: number
  name: string
  description: string
  reviewsCount: string
  viewCount: string
  upvoteCount: number
  isUpvoted?: boolean
}

export function ProductCard({
  id,
  name,
  description,
  reviewsCount,
  viewCount,
  upvoteCount,
  isUpvoted = false,
}: ProductCardProps) {
  const fetcher = useFetcher()
  const optimisticUpvoteCount = fetcher.state === 'idle' ? upvoteCount : isUpvoted ? upvoteCount - 1 : upvoteCount + 1
  const optimisticIsUpvoted = fetcher.state === 'idle' ? isUpvoted : !isUpvoted
  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    fetcher.submit(null, {
      method: 'POST',
      action: `/products/${id}/upvote`,
    })
  }

  return (
    <Link to={`/products/${id}`} className="block">
      <Card className="w-full flex items-center justify-between bg-transparent hover:bg-card/50">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold leading-none tracking-tight">{name}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-px text-xs text-muted-foreground">
              <MessageCircleIcon className="w-4 h-4" />
              <span>{reviewsCount}</span>
            </div>
            <div className="flex items-center gap-px text-xs text-muted-foreground">
              <EyeIcon className="w-4 h-4" />
              <span>{viewCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="py-0">
          <Button
            variant="outline"
            className={cn('flex flex-col h-14', optimisticIsUpvoted ? 'bg-primary text-primary-foreground' : '')}
            onClick={absorbClick}>
            <ChevronUpIcon className="size-4 shrink-0" />
            <span>{optimisticUpvoteCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
