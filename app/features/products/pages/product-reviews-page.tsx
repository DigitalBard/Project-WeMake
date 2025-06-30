import { Button } from '~/common/components/ui/button'
import { ReviewCard } from '../components/review-card'
import { Dialog, DialogTrigger } from '~/common/components/ui/dialog'
import CreateReviewDialog from '../components/create-review-dialog'
import type { Route } from './+types/product-reviews-page'

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Product Reviews | wemake' },
    { name: 'description', content: 'View product reviews and write your own' },
  ]
}

export default function ProductReviewsPage() {
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">10 reviews</h2>
          <DialogTrigger>
            <Button variant={'secondary'}>Write a review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {Array.from({ length: 10 }).map((_, index) => (
            <ReviewCard
              key={index}
              avatarUrl="https://github.com/facebook.png"
              name="John Doe"
              username="username"
              rating={5}
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
              createdAt="10 days ago"
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  )
}
