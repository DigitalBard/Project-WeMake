import type { Route } from '~/types'
import { Form, type MetaArgs } from 'react-router'
import PageHeader from '~/common/components/page-header'
import SelectPair from '~/common/components/select-pair'
import { Calendar } from '~/common/components/ui/calendar'
import { Label } from '~/common/components/ui/label'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { DateTime } from 'luxon'
import { Button } from '~/common/components/ui/button'

export function meta(): Route.MetaFunction {
  return [{ title: '제품 홍보' }, { name: 'description', content: '제품을 홍보하세요' }]
}

export default function PromotePage() {
  const [promotionPeriod, setPromotionPeriod] = useState<DateRange | undefined>()
  const totalDays =
    promotionPeriod?.from && promotionPeriod.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(DateTime.fromJSDate(promotionPeriod.from), 'days').days
      : 0

  return (
    <div>
      <PageHeader title="Promote Your Product" description="Boost your product's visibility." />
      <Form className="max-w-sm mx-auto flex flex-col gap-10 items-center">
        <SelectPair
          name="product"
          label="Select a Product"
          description="Select the product you want to promote."
          options={[
            {
              label: 'AI Dark Mode Maker',
              value: 'ai-dark-mode-maker',
            },
            {
              label: 'AI Dark Mode Maker',
              value: 'ai-dark-mode-maker',
            },
          ]}
          required
          placeholder="Select a Product"
        />
        <div className="flex flex-col gap-4 items-center w-full">
          <Label className="flex flex-col gap-1">
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
        <Button disabled={totalDays === 0}>Go to checkout (${totalDays * 20})</Button>
      </Form>
    </div>
  )
}
