import type { Route } from './+types/categories-page'
import PageHeader from '~/common/components/page-header'
import { CategoryCard } from '../components/category-card'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Categories | wemake' }, { name: 'description', content: 'Product Categories' }]
}

export default function CategoriesPage() {
  return (
    <div className="space-y-10">
      <PageHeader title="Categories" description="Browse products by category" />
      <div className="grid grid-cols-4 w-full gap-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={index}
            id={`categoryId-${index}`}
            name={`Category Name ${index}`}
            description={`Category Description ${index}`}
          />
        ))}
      </div>
    </div>
  )
}
