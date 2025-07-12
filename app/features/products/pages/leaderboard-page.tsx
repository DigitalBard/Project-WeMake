import { Button } from '~/common/components/ui/button'
import { ProductCard } from '../components/product-card'
import type { Route } from './+types/leaderboard-page'
import PageHeader from '~/common/components/page-header'
import { Link } from 'react-router'
import { getProductsByDateRange } from '../queries'
import { DateTime } from 'luxon'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Leaderboard | wemake' }, { name: 'description', content: 'Top products leaderboard' }]
}

export const loader = async () => {
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] = await Promise.all([
    getProductsByDateRange({
      startDate: DateTime.now().startOf('day'),
      endDate: DateTime.now().endOf('day'),
      limit: 7,
    }),
    getProductsByDateRange({
      startDate: DateTime.now().startOf('week'),
      endDate: DateTime.now().endOf('week'),
      limit: 7,
    }),
    getProductsByDateRange({
      startDate: DateTime.now().startOf('month'),
      endDate: DateTime.now().endOf('month'),
      limit: 7,
    }),
    getProductsByDateRange({
      startDate: DateTime.now().startOf('year'),
      endDate: DateTime.now().endOf('year'),
      limit: 7,
    }),
  ])

  return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts }
}

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts } = loaderData

  return (
    <div className="space-y-20">
      <PageHeader title="Leaderboards" description="The most popular products on wemake" />
      {/* Daily Leaderboard */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Daily Leaderboard</h2>
          <p className="text-lg font-light text-foreground">The most popular products on wemake by day.</p>
        </div>
        {dailyProducts.map(product => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/daily">Explore all Products &rarr;</Link>
        </Button>
      </div>
      {/* Weekly Leaderboard */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Weekly Leaderboard</h2>
          <p className="text-lg font-light text-foreground">The most popular products on wemake by week.</p>
        </div>
        {weeklyProducts.map(product => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/weekly">Explore all Products &rarr;</Link>
        </Button>
      </div>
      {/* Monthly Leaderboard */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Monthly Leaderboard</h2>
          <p className="text-lg font-light text-foreground">The most popular products on wemake by month.</p>
        </div>
        {monthlyProducts.map(product => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/monthly">Explore all Products &rarr;</Link>
        </Button>
      </div>
      {/* Yearly Leaderboard */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Yearly Leaderboard</h2>
          <p className="text-lg font-light text-foreground">The most popular products on wemake by year.</p>
        </div>
        {yearlyProducts.map(product => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/yearly">Explore all Products &rarr;</Link>
        </Button>
      </div>
    </div>
  )
}
