import { ProductCard } from '~/features/products/components/product-card'
import type { Route } from './+types/profile-products-page'
import { getUserProducts } from '../queries'

export const loader = async ({ params }: Route.LoaderArgs) => {
  const products = await getUserProducts(params.username)
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
