import { Button } from '~/common/components/ui/button'
import { ReviewCard } from '../components/review-card'
import { Dialog, DialogTrigger } from '~/common/components/ui/dialog'
import CreateReviewDialog from '../components/create-review-dialog'
import type { Route } from './+types/product-reviews-page'
import { useOutletContext } from 'react-router'
import { getReviews } from '../queries'

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Product Reviews | wemake' },
    { name: 'description', content: 'View product reviews and write your own' },
  ]
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const reviews = await getReviews(Number(params.productId))
  return { reviews }
}

export default function ProductReviewsPage({ loaderData }: Route.ComponentProps) {
  const { review_count } = useOutletContext<{ review_count: string }>()
  const { reviews } = loaderData

  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {review_count} {review_count === '1' ? 'Review' : 'Reviews'}
          </h2>
          <DialogTrigger>
            <Button variant={'secondary'}>Write a review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {reviews.map(review => (
            <ReviewCard
              key={review.review_id}
              avatarUrl={review.user.avatar}
              name={review.user.name}
              username={review.user.username}
              rating={review.rating}
              content={review.review}
              createdAt={review.created_at}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  )
}
