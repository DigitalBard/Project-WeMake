import { Form, Link } from 'react-router'
import type { Route } from './+types/join-page'
import InputPair from '~/common/components/input-pair'
import { Button } from '~/common/components/ui/button'
import AuthButtons from '../components/auth-buttons'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Join | wemake' }]
}

export default function JoinPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full py-10">
      <Button variant={'ghost'} asChild className="absolute top-4 right-8">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            id="name"
            label="Name"
            description="Enter your name"
            name="name"
            type="text"
            required
            placeholder="Enter your name"
          />
          <InputPair
            id="username"
            label="Username"
            description="Enter your username"
            name="username"
            type="text"
            required
            placeholder="i.e wemake"
          />
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            type="email"
            required
            placeholder="i.e wemake@example.com"
          />
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
          />
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  )
}
