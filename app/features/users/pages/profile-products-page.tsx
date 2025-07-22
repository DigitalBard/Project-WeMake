import { ProductCard } from '~/features/products/components/product-card'
import type { Route } from './+types/profile-products-page'
import { getUserProducts } from '../queries'
import { makeSSRClient } from '~/supa-client'

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request)
  const products = await getUserProducts(client, { username: params.username })
  return { products }
}

export default function ProfileProductsPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData

  return (
    <div className="flex flex-col gap-5">
      {products.map(product => (
        <ProductCard
          key={product.product_id}
          id={product.product_id}
          name={product.name}
          description={product.tagline}
          reviewsCount={product.reviews}
          viewCount={product.views}
          upvoteCount={product.upvotes}
        />
      ))}
    </div>
  )
}
