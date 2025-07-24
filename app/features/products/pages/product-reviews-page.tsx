import { Button } from '~/common/components/ui/button'
import { ReviewCard } from '../components/review-card'
import { Dialog, DialogTrigger } from '~/common/components/ui/dialog'
import CreateReviewDialog from '../components/create-review-dialog'
import type { Route } from './+types/product-reviews-page'
import { useOutletContext } from 'react-router'
import { getReviews } from '../queries'
import { makeSSRClient } from '~/supa-client'
import { getLoggedInUserId } from '~/features/users/queries'
import { z } from 'zod'
import { createReview } from '../mutations'
import { useEffect, useState } from 'react'

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Product Reviews | wemake' },
    { name: 'description', content: 'View product reviews and write your own' },
  ]
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request)
  const reviews = await getReviews(client, { productId: Number(params.productId) })
  return { reviews }
}

export const formSchema = z.object({
  review: z.string().min(1).max(1000),
  rating: z.coerce.number().min(1).max(5),
})

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)
  const formData = await request.formData()
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))

  if (!success) {
    return { formErrors: error.flatten().fieldErrors }
  }

  await createReview(client, {
    productId: params.productId,
    userId,
    review: data.review,
    rating: data.rating,
  })

  return { ok: true }
}

export default function ProductReviewsPage({ loaderData, actionData }: Route.ComponentProps) {
  const { review_count } = useOutletContext<{ review_count: string }>()
  const { reviews } = loaderData
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (actionData?.ok) {
      setOpen(false)
    }
  }, [actionData])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
