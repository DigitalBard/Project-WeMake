import { ProductCard } from '~/features/products/components/product-card'
import type { Route } from './+types/profile-products-page'

export default function ProfileProductsPage() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <ProductCard
          key={index}
          id={`productId-${index}`}
          name={`Product Name ${index}`}
          description={`Product Description ${index}`}
          commentCount={12}
          viewCount={12}
          upvoteCount={120}
        />
      ))}
    </div>
  )
}
