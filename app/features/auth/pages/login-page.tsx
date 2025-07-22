import { Form, Link, redirect, useNavigation } from 'react-router'
import InputPair from '~/common/components/input-pair'
import { Button } from '~/common/components/ui/button'
import type { Route } from './+types/login-page'
import AuthButtons from '../components/auth-buttons'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { makeSSRClient } from '~/supa-client'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Login | wemake' }]
}

const formSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.', invalid_type_error: 'Email must be a string.' })
    .email({ message: 'Invalid email address.' }),
  password: z
    .string({ required_error: 'Password is required.', invalid_type_error: 'Password must be a string.' })
    .min(8, {
      message: 'Password must be at least 6 characters long.',
    }),
})

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData()
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
      loginError: null,
    }
  }

  const { email, password } = data
  const { client, headers } = makeSSRClient(request)
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  })

  if (loginError) {
    return {
      loginError: loginError.message,
      formErrors: null,
    }
  }

  return redirect('/', {
    headers,
  })
}

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting' || navigation.state === 'loading'

  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={'ghost'} asChild className="absolute top-4 right-8">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            type="text"
            required
            placeholder="i.e wemake@example.com"
          />
          {actionData && 'formErrors' in actionData && (
            <p className="text-sm text-red-500">{actionData.formErrors?.email?.join(', ')}</p>
          )}
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
          />
          {actionData && 'formErrors' in actionData && (
            <p className="text-sm text-red-500">{actionData.formErrors?.password?.join(', ')}</p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Log in'}
          </Button>
          {actionData && 'loginError' in actionData && <p className="text-sm text-red-500">{actionData.loginError}</p>}
        </Form>
        <AuthButtons />
      </div>
    </div>
  )
}
