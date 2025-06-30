import z from 'zod'
import type { Route } from './+types/search-page'
import { data, Form } from 'react-router'
import PageHeader from '~/common/components/page-header'
import { ProductPagination } from '~/common/components/product-pagination'
import { ProductCard } from '../components/product-card'
import { Input } from '~/common/components/ui/input'
import { Button } from '~/common/components/ui/button'
export function meta() {
  return [{ title: `Search for Products | wemake` }, { name: 'description', content: 'Search for Products' }]
}

const searchSchema = z.object({
  query: z.string().optional().default(''),
  page: z.coerce.number().optional().default(1),
})

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const { success, data: parsedData } = searchSchema.safeParse(Object.fromEntries(url.searchParams))

  if (!success) {
    throw data({ error_code: 'invalid_params', message: 'Invalid params' }, { status: 400 })
  }
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <PageHeader title="Search" description="Search for Products by title or description" />
      <Form className="flex justify-center items-center max-w-screen-sm mx-auto gap-2">
        <Input name="query" placeholder="Search for Products" className="text-lg" />
        <Button type="submit">Search</Button>
      </Form>
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
