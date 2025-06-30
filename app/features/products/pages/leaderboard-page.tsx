import { Button } from '~/common/components/ui/button'
import { ProductCard } from '../components/product-card'
import type { Route } from './+types/leaderboard-page'
import PageHeader from '~/common/components/page-header'
import { Link } from 'react-router'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Leaderboard | wemake' }, { name: 'description', content: 'Top products leaderboard' }]
}

export default function LeaderboardPage() {
  return (
    <div className="space-y-20">
      <PageHeader title="Leaderboards" description="The most popular products on wemake" />
      {/* Daily Leaderboard */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Daily Leaderboard</h2>
          <p className="text-lg font-light text-foreground">The most popular products on wemake by day.</p>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
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
        {Array.from({ length: 7 }).map((_, index) => (
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
        {Array.from({ length: 7 }).map((_, index) => (
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
        {Array.from({ length: 7 }).map((_, index) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/yearly">Explore all Products &rarr;</Link>
        </Button>
      </div>
    </div>
  )
}
