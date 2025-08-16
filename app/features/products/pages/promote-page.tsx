import type { Route } from './+types/promote-page'
import PageHeader from '~/common/components/page-header'
import SelectPair from '~/common/components/select-pair'
import { Calendar } from '~/common/components/ui/calendar'
import { Label } from '~/common/components/ui/label'
import { useEffect, useRef, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { DateTime } from 'luxon'
import { Button } from '~/common/components/ui/button'
import { loadTossPayments, type TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk'
import { makeSSRClient } from '~/supa-client'
import { getLoggedInUserId, getProductsByUserId } from '~/features/users/queries'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Promote Your Product' }, { name: 'description', content: "Boost your product's visibility." }]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)

  const products = await getProductsByUserId(client, { userId })
  return { products, userId }
}

export default function PromotePage({ loaderData }: Route.ComponentProps) {
  const { products, userId } = loaderData
  const [promotionPeriod, setPromotionPeriod] = useState<DateRange | undefined>()
  const totalDays =
    promotionPeriod?.from && promotionPeriod.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(DateTime.fromJSDate(promotionPeriod.from), 'days').days
      : 0

  const widgets = useRef<TossPaymentsWidgets | null>(null)
  const initeToss = useRef<boolean>(false)
  useEffect(() => {
    const initToss = async () => {
      if (initeToss.current) return
      initeToss.current = true
      const toss = await loadTossPayments('test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm')
      widgets.current = await toss.widgets({
        customerKey: userId,
      })
      await widgets.current.setAmount({
        value: 0,
        currency: 'KRW',
      })
      await widgets.current.renderPaymentMethods({
        selector: '#toss-payment-methods',
      })
      await widgets.current.renderAgreement({
        selector: '#toss-payment-agreement',
      })
    }
    initToss()
  }, [])

  useEffect(() => {
    const updateAmount = async () => {
      if (widgets.current) {
        await widgets.current.setAmount({
          value: totalDays * 20000,
          currency: 'KRW',
        })
      }
    }
    updateAmount()
  }, [promotionPeriod])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const product = formData.get('product') as string

    if (!product || !promotionPeriod?.from || !promotionPeriod?.to) {
      return
    }

    await widgets.current?.requestPayment({
      orderId: crypto.randomUUID(),
      orderName: `WeMake Promotion`,
      customerName: 'a real man',
      customerEmail: 'a@real.man',
      customerMobilePhone: '01012345678',
      metadata: {
        product,
        promotionFrom: DateTime.fromJSDate(promotionPeriod.from).toISO(),
        promotionTo: DateTime.fromJSDate(promotionPeriod.to).toISO(),
      },
      successUrl: `${window.location.href}/success`,
      failUrl: `${window.location.href}/fail`,
    })
  }

  return (
    <div>
      <PageHeader title="Promote Your Product" description="Boost your product's visibility." />
      <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-10">
        <div className="col-span-3 mx-auto flex flex-col gap-10 items-center">
          <SelectPair
            name="product"
            label="Select a Product"
            description="Select the product you want to promote."
            options={products.map(product => ({
              label: product.name,
              value: product.name,
            }))}
            required
            placeholder="Select a Product"
          />
          <div className="flex flex-col gap-4 w-full">
            <Label className="flex flex-col gap-1 items-start">
              Select a range of dates for promotion.{' '}
              <small className="text-muted-foreground text-center">Minimum duration is 3 days.</small>
            </Label>
            <Calendar
              mode="range"
              selected={promotionPeriod}
              onSelect={setPromotionPeriod}
              min={3}
              disabled={{ before: new Date() }}
            />
          </div>
        </div>
        <aside className="col-span-3 px-20 flex flex-col items-center">
          <div id="toss-payment-methods" className="w-full" />
          <div id="toss-payment-agreement" className="w-full" />
          <Button className="w-full" disabled={totalDays === 0}>
            Checkout ({(totalDays * 20000).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })})
          </Button>
        </aside>
      </form>
    </div>
  )
}
