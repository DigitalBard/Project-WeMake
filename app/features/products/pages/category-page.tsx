import { ProductPagination } from '~/common/components/product-pagination'
import PageHeader from '~/common/components/page-header'
import { ProductCard } from '../components/product-card'
import type { Route } from './+types/category-page'
import { getCategory, getCategoryPages, getProductsByCategory } from '../queries'
import { z } from 'zod'
import { makeSSRClient } from '~/supa-client'

export const meta: Route.MetaFunction = ({
  data: {
    category: { name, description },
  },
}: Route.MetaArgs) => {
  return [{ title: `${name} | wemake` }, { name: 'description', content: description }]
}

const paramsSchema = z.object({
  category: z.coerce.number(),
})

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page')) || 1

  const { success, data } = paramsSchema.safeParse(params)

  if (!success) {
    throw new Error('Invalid category ID')
  }

  const [category, products, totalPages] = await Promise.all([
    getCategory(client, { categoryId: data.category }),
    getProductsByCategory(client, { categoryId: data.category, page: Number(page) }),
    getCategoryPages(client, { categoryId: data.category }),
  ])

  return { category, products, totalPages }
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  const { category, products, totalPages } = loaderData

  return (
    <div className="space-y-10">
      <PageHeader title={category.name} description={category.description} />
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {products.map(product => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={Number(product.upvotes)}
          />
        ))}
      </div>
      <ProductPagination totalPages={totalPages} />
    </div>
  )
}
