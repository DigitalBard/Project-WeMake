import { redirect } from 'react-router'
import type { Route } from './+types/product-visit-page'
import { makeSSRClient } from '~/supa-client'
import { getLoggedInUserId, getProductsByUserId } from '~/features/users/queries'

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const {
    data: { user },
  } = await client.auth.getUser()
  const { data } = await client.from('products').select('url').eq('product_id', Number(params.productId)).single()

  if (data) {
    if (!user) {
      await client.rpc('track_event', {
        event_type: 'product_visit',
        event_data: {
          product_id: params.productId,
        },
      })
    } else {
      const myProducts = await getProductsByUserId(client, { userId: user.id })
      const myProductIds = myProducts.map(product => product.product_id)
      if (!myProductIds.includes(Number(params.productId))) {
        await client.rpc('track_event', {
          event_type: 'product_visit',
          event_data: {
            product_id: params.productId,
          },
        })
      }
    }
    return redirect(data.url)
  }
}
