import { Link } from 'react-router'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../common/components/ui/card'
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from 'lucide-react'
import { Button } from '../../../common/components/ui/button'

interface ProductCardProps {
  id: number
  name: string
  description: string
  reviewsCount: string
  viewCount: string
  upvoteCount: string
}

export function ProductCard({ id, name, description, reviewsCount, viewCount, upvoteCount }: ProductCardProps) {
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
          <Button variant="outline" className="flex flex-col h-14">
            <ChevronUpIcon className="size-4 shrink-0" />
            <span>{upvoteCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
