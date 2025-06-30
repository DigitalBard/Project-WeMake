import { Form } from 'react-router'
import InputPair from '~/common/components/input-pair'
import { Button } from '~/common/components/ui/button'
import type { Route } from './+types/otp-complete-page'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'VerifyOTP | wemake' }]
}

export default function OtpCompletePage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full`">
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Confirm OTP</h1>
          <p className="text-sm text-muted-foreground">Enter the 4-digit code sent to your email.</p>
        </div>
        <Form className="w-full space-y-4">
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            type="text"
            required
            placeholder="i.e wemake@example.com"
          />
          <InputPair
            id="otp"
            label="OTP"
            description="Enter the 4-digit code"
            name="otp"
            type="text"
            required
            placeholder="i.e 1234"
          />
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  )
}
