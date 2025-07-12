import type { Route } from './+types/categories-page'
import PageHeader from '~/common/components/page-header'
import { CategoryCard } from '../components/category-card'
import { getCategories } from '../queries'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Categories | wemake' }, { name: 'description', content: 'Product Categories' }]
}

export const loader = async () => {
  const categories = await getCategories()
  return { categories }
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData

  return (
    <div className="space-y-10">
      <PageHeader title="Categories" description="Browse products by category" />
      <div className="grid grid-cols-4 w-full gap-10">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.category_id}
            id={category.category_id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  )
}
