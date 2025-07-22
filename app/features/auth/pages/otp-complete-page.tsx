import { Form, redirect, useNavigation, useSearchParams } from 'react-router'
import InputPair from '~/common/components/input-pair'
import { Button } from '~/common/components/ui/button'
import type { Route } from './+types/otp-complete-page'
import z from 'zod'
import { makeSSRClient } from '~/supa-client'
import { Loader2 } from 'lucide-react'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'VerifyOTP | wemake' }]
}

const formSchema = z.object({
  phone: z.string(),
  otp: z.string().min(6).max(6),
})

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData()
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors }
  }

  const { phone, otp } = data
  const { client, headers } = makeSSRClient(request)
  const { error: verifyError } = await client.auth.verifyOtp({
    phone,
    token: otp,
    type: 'sms',
  })

  if (verifyError) {
    return { verifyError: verifyError.message }
  }

  return redirect('/', { headers })
}

export default function OtpCompletePage({ actionData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams()
  const phone = searchParams.get('phone')
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting' || navigation.state === 'loading'

  return (
    <div className="flex flex-col relative items-center justify-center h-full`">
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Confirm OTP</h1>
          <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your phone.</p>
        </div>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="phone"
            label="Phone"
            description="Enter your phone number"
            name="phone"
            type="tel"
            defaultValue={phone || ''}
            required
            placeholder="i.e 1234567890"
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.phone?.join(', ')}</p>
          )}
          <InputPair
            id="otp"
            label="OTP"
            description="Enter the 6-digit code"
            name="otp"
            type="text"
            required
            placeholder="i.e 123456"
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.otp?.join(', ')}</p>
          )}
          {actionData && 'verifyError' in actionData && <p className="text-red-500">{actionData.verifyError}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify OTP'}
          </Button>
        </Form>
      </div>
    </div>
  )
}
