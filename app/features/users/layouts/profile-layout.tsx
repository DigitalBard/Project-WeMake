import { Link, NavLink, Outlet } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Button, buttonVariants } from '~/common/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/common/components/ui/dialog'
import { Textarea } from '~/common/components/ui/textarea'
import { Form } from 'react-router'
import { Badge } from '~/common/components/ui/badge'
import { cn } from '~/lib/utils'
import type { Route } from './+types/profile-layout'
import { getUserProfile } from '../queries'

export const loader = async ({ params }: Route.LoaderArgs & { params: { username: string } }) => {
  const user = await getUserProfile(params.username)
  return { user }
}

export default function ProfileLayout({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <Avatar className="size-40">
          {user.avatar ? <AvatarImage src={user.avatar} /> : null}
          <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-5">
          <div className="flex gap-2">
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <Button variant={'outline'} asChild>
              <Link to={'/my/settings'}>Edit profile</Link>
            </Button>
            <Button variant={'secondary'}>Follow</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Message</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Message</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-4">
                  <span className="text-sm text-muted-foreground">Send a message to John Doe</span>
                  <Form className="space-y-4 flex flex-col">
                    <Textarea placeholder="Message" className="resize-none" rows={4} />
                    <Button type="submit" className="self-end">
                      Send
                    </Button>
                  </Form>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">@{user.username}</span>
            <Badge variant="secondary">{user.role}</Badge>
            <Badge variant="secondary">100 followers</Badge>
            <Badge variant="secondary">100 following</Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        {[
          { label: 'About', to: `/users/${user.username}` },
          { label: 'Products', to: `/users/${user.username}/products` },
          { label: 'Posts', to: `/users/${user.username}/posts` },
        ].map(({ label, to }) => (
          <NavLink
            end
            key={label}
            className={({ isActive }) =>
              cn([buttonVariants({ variant: 'outline' }), isActive && 'bg-accent text-foreground'])
            }
            to={to}>
            {label}
          </NavLink>
        ))}
      </div>
      <div className="max-w-screen-md">
        <Outlet context={{ headline: user.headline, bio: user.bio }} />
      </div>
    </div>
  )
}
