import { ChevronUpIcon, StarIcon } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router'
import { Button, buttonVariants } from '~/common/components/ui/button'
import type { Route } from './+types/product-overview-layout'
import { cn } from '~/lib/utils'
import { getProductById } from '../queries'

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `${data.product.name} Overview | wemake` },
    { name: 'description', content: data.product.description },
  ]
}

export const loader = async ({ params }: Route.LoaderArgs & { params: { productId: string } }) => {
  const product = await getProductById(Number(params.productId))
  return { product }
}

export default function ProductOverviewLayout({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData

  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
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
          <Button size={'lg'} className="text-lg h-14 px-10">
            <ChevronUpIcon className="size-4" />
            Upvote ({product.upvotes})
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
