import { data, isRouteErrorResponse, Link } from 'react-router'
import type { Route } from './+types/weekly-leaderboard-page'
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
    weekYear: Number(params.year),
    weekNumber: Number(params.week),
  })
    .setZone('Asia/Seoul')
    .setLocale('ko')

  return [
    {
      title: `The best of ${date.startOf('week').toLocaleString(DateTime.DATE_SHORT)} - ${date
        .endOf('week')
        .toLocaleString(DateTime.DATE_SHORT)} | wemake`,
    },
    { name: 'description', content: 'weekly leaderboard' },
  ]
}

const paramsSchema = z.object({
  year: z.coerce.number(),
  week: z.coerce.number(),
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
    weekYear: parsedData.year,
    weekNumber: parsedData.week,
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

  const today = DateTime.now().setZone('Asia/Seoul').startOf('week')
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
    startDate: date.startOf('week'),
    endDate: date.endOf('week'),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get('page')) || 1,
  })

  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf('week'),
    endDate: date.endOf('week'),
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

export default function WeeklyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { products, totalPages, user } = loaderData

  const urlDate = DateTime.fromObject({ weekYear: loaderData.year, weekNumber: loaderData.week })
  const previousWeek = urlDate.minus({ weeks: 1 })
  const nextWeek = urlDate.plus({ weeks: 1 })
  const isToday = urlDate.equals(DateTime.now().startOf('week'))

  return (
    <div className="space-y-5">
      <PageHeader
        title="The best products of the week"
        description={`${urlDate.startOf('week').toLocaleString(DateTime.DATE_SHORT)} - ${urlDate
          .endOf('week')
          .toLocaleString(DateTime.DATE_SHORT)}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/weekly/${previousWeek.year}/${previousWeek.weekNumber}`}>
            &larr; {previousWeek.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/weekly/${nextWeek.year}/${nextWeek.weekNumber}`}>
              {nextWeek.toLocaleString(DateTime.DATE_SHORT)} &rarr;
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
