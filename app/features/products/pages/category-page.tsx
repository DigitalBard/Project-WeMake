import { ProductPagination } from '~/common/components/product-pagination'
import PageHeader from '~/common/components/page-header'
import { ProductCard } from '../components/product-card'
import type { Route } from './+types/category-page'

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: 'Developer Tools' },
    { name: 'description', content: 'Tools for developers to build products faster.' },
  ]
}

export default function CategoryPage() {
  return (
    <div className="space-y-10">
      <PageHeader title="Developer Tools" description="Tools for developers to build products faster." />
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {Array.from({ length: 11 }).map((_, index) => (
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
      <ProductPagination totalPages={10} />
    </div>
  )
}
