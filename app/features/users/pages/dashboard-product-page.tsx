import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '~/common/components/ui/chart'
import type { Route } from './+types/dashboard-product-page'
import { Card, CardContent, CardHeader, CardTitle } from '~/common/components/ui/card'
import { Area, AreaChart, CartesianGrid, Line, XAxis } from 'recharts'
import { makeSSRClient } from '~/supa-client'
import { getLoggedInUserId } from '../queries'
import { redirect } from 'react-router'

export const meta: Route.MetaFunction = () => {
  return [{ title: '내 제품' }, { name: 'description', content: '내가 등록한 제품 관리' }]
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)
  const { error } = await client
    .from('products')
    .select('product_id')
    .eq('profile_id', userId)
    .eq('product_id', Number(params.productId))
    .single()
  if (error) {
    throw redirect('/my/dashboard/products')
  }
  const { data, error: rcpError } = await client.rpc('get_product_stats', { product_id: params.productId })
  if (rcpError) {
    throw new Error(rcpError.message)
  }

  return { chartData: data }
}

// chartData 와 chartConfig는 데이터 키가 동일해야 함. (views 부분 참조)
// const chartData = [
//   { month: 'January', views: 186, visitors: 86 },
//   { month: 'February', views: 305, visitors: 180 },
//   { month: 'March', views: 237, visitors: 97 },
//   { month: 'April', views: 73, visitors: 23 },
//   { month: 'May', views: 209, visitors: 111 },
//   { month: 'June', views: 214, visitors: 200 },
// ]
const chartConfig = {
  views: {
    label: 'Page Views',
    color: 'hsl(var(--chart-1))', // 여기서는 컬러 설정 시 hsl() 형식으로 설정해야 함
  },
  visitors: {
    label: 'Visitors',
    color: 'hsl(var(--chart-2))', // 여기서는 컬러 설정 시 hsl() 형식으로 설정해야 함
  },
} satisfies ChartConfig

export default function DashboardProductPage({ loaderData }: Route.ComponentProps) {
  const { chartData } = loaderData

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} interval="preserveStartEnd" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel indicator="dot" />}
                wrapperStyle={{ minWidth: '140px' }}
              />
              <Area
                dataKey="product_views"
                type="natural"
                strokeWidth={2}
                dot={false}
                stroke="var(--color-views)"
                fill="var(--color-views)"
              />
              <Area
                dataKey="product_visits"
                type="natural"
                strokeWidth={2}
                dot={false}
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
