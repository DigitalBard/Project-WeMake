import { Form, redirect, useNavigation } from 'react-router'
import InputPair from '~/common/components/input-pair'
import { Button } from '~/common/components/ui/button'
import type { Route } from './+types/otp-start-page'
import z from 'zod'
import { makeSSRClient } from '~/supa-client'
import { Loader2 } from 'lucide-react'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'OTP | wemake' }]
}

const formSchema = z.object({
  // email: z.string().email(),
  phone: z.string(),
})

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData()
  const { success, data } = await formSchema.safeParse(Object.fromEntries(formData))
  if (!success) {
    return { error: 'Invalid phone number.' }
  }
  const { phone } = data
  const { client } = makeSSRClient(request)
  const { error } = await client.auth.signInWithOtp({
    phone,
    options: {
      shouldCreateUser: true,
    },
  })

  if (error) {
    return { error: 'Failed to send OTP' }
  }

  return redirect(`/auth/otp/complete?phone=${phone}`)
}

export default function OtpStartPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting' || navigation.state === 'loading'

  return (
    <div className="flex flex-col relative items-center justify-center h-full`">
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Log in with OTP</h1>
          <p className="text-sm text-muted-foreground">We will send you a 6-digit code to log in to your account.</p>
        </div>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="Phone"
            label="Phone"
            description="Enter your phone number"
            name="phone"
            type="tel"
            required
            placeholder="i.e 1234567890"
          />
          {actionData && 'error' in actionData && <p className="text-red-500">{actionData.error}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send OTP'}
          </Button>
        </Form>
      </div>
    </div>
  )
}
