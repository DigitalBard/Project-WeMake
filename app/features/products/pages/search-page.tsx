import z from 'zod'
import type { Route } from './+types/search-page'
import { data, Form } from 'react-router'
import PageHeader from '~/common/components/page-header'
import { ProductPagination } from '~/common/components/product-pagination'
import { ProductCard } from '../components/product-card'
import { Input } from '~/common/components/ui/input'
import { Button } from '~/common/components/ui/button'
import { getPagesBySearch, getProductsBySearch } from '../queries'

export function meta() {
  return [{ title: `Search for Products | wemake` }, { name: 'description', content: 'Search for Products' }]
}

const searchSchema = z.object({
  query: z.string().optional().default(''),
  page: z.coerce.number().optional().default(1),
})

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const { success, data: parsedData } = searchSchema.safeParse(Object.fromEntries(url.searchParams))

  if (!success) {
    throw data({ error_code: 'invalid_params', message: 'Invalid params' }, { status: 400 })
  }

  if (parsedData.query === '') {
    return { products: [], totalPages: 1 }
  }

  const products = await getProductsBySearch({ query: parsedData.query, page: parsedData.page })
  const totalPages = await getPagesBySearch({ query: parsedData.query })

  return { products, totalPages }
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const { products, totalPages } = loaderData

  return (
    <div className="space-y-10">
      <PageHeader title="Search" description="Search for Products by title or description" />
      <Form className="flex justify-center items-center max-w-screen-sm mx-auto gap-2">
        <Input name="query" placeholder="Search for Products" className="text-lg" />
        <Button type="submit">Search</Button>
      </Form>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
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
      <ProductPagination totalPages={totalPages} />
    </div>
  )
}
