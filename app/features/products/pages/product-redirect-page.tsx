import { redirect } from 'react-router'
import type { Route } from './+types/product-redirect-page'

export const loader = ({ params }: Route.LoaderArgs) => {
  const { productId } = params
  return redirect(`/products/${productId}/overview`)
}
