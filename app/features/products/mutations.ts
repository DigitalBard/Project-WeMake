import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/supa-client'

export const createReview = async (
  client: SupabaseClient<Database>,
  { productId, userId, review, rating }: { productId: string; userId: string; review: string; rating: number }
) => {
  const { error } = await client.from('reviews').insert({
    product_id: +productId,
    profile_id: userId,
    review,
    rating,
  })

  if (error) {
    throw new Error(error.message)
  }
}

export const createProduct = async (
  client: SupabaseClient<Database>,
  {
    name,
    tagline,
    url,
    description,
    categoryId,
    icon,
    userId,
    howItWorks,
  }: {
    name: string
    tagline: string
    url: string
    description: string
    categoryId: number
    icon: string
    userId: string
    howItWorks: string
  }
) => {
  const { data, error } = await client
    .from('products')
    .insert({
      name,
      tagline,
      url,
      description,
      category_id: categoryId,
      icon,
      profile_id: userId,
      how_it_works: howItWorks,
    })
    .select('product_id')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.product_id
}
