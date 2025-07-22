import { Form, Link, redirect, useNavigation } from 'react-router'
import type { Route } from './+types/join-page'
import InputPair from '~/common/components/input-pair'
import { Button } from '~/common/components/ui/button'
import AuthButtons from '../components/auth-buttons'
import { z } from 'zod'
import { makeSSRClient } from '~/supa-client'
import { checkUsernameExists } from '../queries'
import { Loader2 } from 'lucide-react'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Join | wemake' }]
}

const formSchema = z.object({
  name: z.string({ required_error: 'Name is required.', invalid_type_error: 'Name must be a string.' }).min(2, {
    message: 'Name must be at least 2 characters long.',
  }),
  username: z
    .string({ required_error: 'Username is required.', invalid_type_error: 'Username must be a string.' })
    .min(3, {
      message: 'Username must be at least 3 characters long.',
    }),
  email: z
    .string({ required_error: 'Email is required.', invalid_type_error: 'Email must be a string.' })
    .email({ message: 'Invalid email address.' }),
  password: z
    .string({ required_error: 'Password is required.', invalid_type_error: 'Password must be a string.' })
    .min(8, {
      message: 'Password must be at least 8 characters long.',
    }),
})

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData()
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))

  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    }
  }

  const usernameExists = await checkUsernameExists(request, { username: data.username })
  if (usernameExists) {
    return {
      formErrors: {
        username: ['Username already exists.'],
      },
    }
  }

  const { client, headers } = makeSSRClient(request)
  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        username: data.username,
      },
    },
  })

  if (signUpError) {
    return {
      signUpError: signUpError.message,
    }
  }

  return redirect('/', {
    headers,
  })
}

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting' || navigation.state === 'loading'

  return (
    <div className="flex flex-col relative items-center justify-center h-full py-10">
      <Button variant={'ghost'} asChild className="absolute top-4 right-8">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="name"
            label="Name"
            description="Enter your name"
            name="name"
            type="text"
            required
            placeholder="Enter your name"
          />
          {actionData && 'formErrors' in actionData && (
            <p className="text-sm text-red-500">{actionData.formErrors?.name}</p>
          )}
          <InputPair
            id="username"
            label="Username"
            description="Enter your username"
            name="username"
            type="text"
            required
            placeholder="i.e wemake"
          />
          {actionData && 'formErrors' in actionData && (
            <p className="text-sm text-red-500">{actionData.formErrors?.username}</p>
          )}
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            type="email"
            required
            placeholder="i.e wemake@example.com"
          />
          {actionData && 'formErrors' in actionData && (
            <p className="text-sm text-red-500">{actionData.formErrors?.email}</p>
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
            <p className="text-sm text-red-500">{actionData.formErrors?.password}</p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create account'}
          </Button>
          {actionData && 'signUpError' in actionData && (
            <p className="text-sm text-red-500">{actionData.signUpError}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  )
}
