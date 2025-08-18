import { Heart, StarIcon } from 'lucide-react'
import { Link, NavLink, Outlet, useFetcher } from 'react-router'
import { Button, buttonVariants } from '~/common/components/ui/button'
import type { Route } from './+types/product-overview-layout'
import { cn } from '~/lib/utils'
import { getProductById } from '../queries'
import { makeSSRClient } from '~/supa-client'

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `${data.product.name} Overview | wemake` },
    { name: 'description', content: data.product.description },
  ]
}

export const loader = async ({ request, params }: Route.LoaderArgs & { params: { productId: string } }) => {
  const { client } = makeSSRClient(request)
  const product = await getProductById(client, { productId: Number(params.productId) })
  return { product }
}

export default function ProductOverviewLayout({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData
  const fetcher = useFetcher()
  const optimisticUpvoteCount =
    fetcher.state === 'idle'
      ? product.upvotes
      : product.is_upvoted
      ? Number(product.upvotes) - 1
      : Number(product.upvotes) + 1
  const optimisticIsUpvoted = fetcher.state === 'idle' ? product.is_upvoted : !product.is_upvoted
  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    fetcher.submit(null, { method: 'post', action: `/products/${product.product_id}/upvote` })
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl overflow-hidden shadow-xl bg-primary/50">
            <img src={product.icon} alt={product.name} className="size-full object-cover" />
          </div>
          <div>
            <h1 className="text-5xl font-bold">{product.name}</h1>
            <p className="text-2xl font-light">{product.tagline}</p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className="size-4 text-yellow-400"
                    fill={index < Math.floor(product.average_rating) ? 'currentColor' : 'none'}></StarIcon>
                ))}
              </div>
              <span className="text-muted-foreground">{product.reviews} reivews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Button variant={'secondary'} size={'lg'} className="text-lg h-14 px-10" asChild>
            <Link to={`/products/${product.product_id}/visit`}>Visit Website</Link>
          </Button>
          <Button size={'lg'} className="text-lg h-14 px-10" onClick={absorbClick}>
            <Heart className={cn('size-4', optimisticIsUpvoted ? 'fill-red-500' : '')} />
            Upvote ({optimisticUpvoteCount})
          </Button>
        </div>
      </div>
      <div className="flex gap-2.5">
        <NavLink
          end
          className={({ isActive }) =>
            cn([buttonVariants({ variant: 'outline' }), isActive && 'bg-accent text-foreground'])
          }
          to={`/products/${product.product_id}/overview`}>
          Overview
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            cn([buttonVariants({ variant: 'outline' }), isActive && 'bg-accent text-foreground'])
          }
          to={`/products/${product.product_id}/reviews`}>
          Reviews
        </NavLink>
      </div>
      <Outlet
        context={{
          product_id: product.product_id,
          description: product.description,
          how_it_works: product.how_it_works,
          review_count: product.reviews,
        }}
      />
    </div>
  )
}
