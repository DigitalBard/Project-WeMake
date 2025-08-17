import { useOutletContext } from 'react-router'
import type { Route } from './+types/product-overview-page'
import { makeSSRClient } from '~/supa-client'
import { getLoggedInUserId, getProductsByUserId } from '~/features/users/queries'

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const {
    data: { user },
  } = await client.auth.getUser()

  if (!user) {
    await client.rpc('track_event', {
      event_type: 'product_view',
      event_data: {
        product_id: params.productId,
      },
    })
  } else {
    const myProducts = await getProductsByUserId(client, { userId: user.id })
    const myProductIds = myProducts.map(product => product.product_id)
    if (!myProductIds.includes(Number(params.productId))) {
      await client.rpc('track_event', {
        event_type: 'product_view',
        event_data: {
          product_id: params.productId,
        },
      })
    }
  }
}

export default function ProductOverviewPage() {
  const { description, how_it_works } = useOutletContext<{ description: string; how_it_works: string }>()

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">What is this product?</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold">How does it work?</h3>
        <p className="text-muted-foreground">{how_it_works}</p>
      </div>
    </div>
  )
}
