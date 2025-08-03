import { Resend } from 'resend'
import type { Route } from './+types/welcome-page'
import { WelcomeUser } from 'react-email-starter/emails/welcome-user'

const client = new Resend(process.env.RESEND_API_KEY)

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { data, error } = await client.emails.send({
    from: 'WeMake <no-reply@mail.wemake.lol>',
    to: 'baek2332@gmail.com',
    subject: 'Welcome to WeMake.lol',
    react: <WelcomeUser username={params.username} />,
  })

  return Response.json({
    data,
    error,
  })
}
