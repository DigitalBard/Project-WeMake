import { data, isRouteErrorResponse, Link } from 'react-router'
import type { Route } from './+types/monthly-leaderboard-page'
import { DateTime } from 'luxon'
import { z } from 'zod'
import PageHeader from '~/common/components/page-header'
import { ProductCard } from '../components/product-card'
import { Button } from '~/common/components/ui/button'
import { ProductPagination } from '~/common/components/product-pagination'
import { getProductPagesByDateRange, getProductsByDateRange } from '../queries'
import { PAGE_SIZE } from '../constants'
import { makeSSRClient } from '~/supa-client'

export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
  })
    .setZone('Asia/Seoul')
    .setLocale('ko')

  return [
    { title: `The best of ${date.toLocaleString({ year: '2-digit', month: 'long' })} | wemake` },
    { name: 'description', content: 'monthly leaderboard' },
  ]
}

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
})

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const { success, data: parsedData } = paramsSchema.safeParse(params)

  if (!success) {
    throw data(
      {
        error_code: 'invalid_params',
        message: 'Invalid params',
      },
      {
        status: 400,
      }
    )
  }

  const date = DateTime.fromObject({
    year: parsedData.year,
    month: parsedData.month,
  }).setZone('Asia/Seoul')

  if (!date.isValid) {
    throw data(
      {
        error_code: 'invalid_date',
        message: 'Invalid date',
      },
      {
        status: 400,
      }
    )
  }

  const today = DateTime.now().setZone('Asia/Seoul').startOf('month')
  if (date > today) {
    throw data(
      {
        error_code: 'future_date',
        message: 'Future date',
      },
      {
        status: 400,
      }
    )
  }

  const url = new URL(request.url)
  const products = await getProductsByDateRange(client, {
    startDate: date.startOf('month'),
    endDate: date.endOf('month'),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get('page')) || 1,
  })

  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf('month'),
    endDate: date.endOf('month'),
  })

  const {
    data: { user },
  } = await client.auth.getUser()

  return {
    products,
    totalPages,
    user,
    ...parsedData,
  }
}

export default function MonthlyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { products, totalPages, user } = loaderData

  const urlDate = DateTime.fromObject({ year: loaderData.year, month: loaderData.month })
  const previousMonth = urlDate.minus({ months: 1 })
  const nextMonth = urlDate.plus({ months: 1 })
  const isToday = urlDate.equals(DateTime.now().startOf('month'))

  return (
    <div className="space-y-5">
      <PageHeader
        title="The best products of the month"
        description={`${urlDate.toLocaleString({
          year: 'numeric',
          month: 'long',
        })}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}>
            &larr;{' '}
            {previousMonth.toLocaleString({
              year: '2-digit',
              month: 'long',
            })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}>
              {nextMonth.toLocaleString({
                year: '2-digit',
                month: 'long',
              })}{' '}
              &rarr;
            </Link>
          </Button>
        ) : null}
      </div>
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
            isUpvoted={user ? product.upvoters.some(upvoter => upvoter.profile_id === user.id) : false}
          />
        ))}
      </div>
      <ProductPagination totalPages={totalPages} />
    </div>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    )
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>
  }

  return <div>Unknown error</div>
}
