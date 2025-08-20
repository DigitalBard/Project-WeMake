import { Link, NavLink, Outlet, useOutletContext } from 'react-router'
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
import { getFollowers, getFollowing, getUserProfile } from '../queries'
import { makeSSRClient } from '~/supa-client'

export const loader = async ({ request, params }: Route.LoaderArgs & { params: { username: string } }) => {
  const { client } = makeSSRClient(request)
  const user = await getUserProfile(client, { username: params.username })
  const followers = await getFollowers(client, { username: params.username })
  const following = await getFollowing(client, { username: params.username })
  return { user, followers, following }
}

export default function ProfileLayout({ loaderData, params }: Route.ComponentProps) {
  const { user, followers, following } = loaderData
  const { isLoggedIn, username } = useOutletContext<{ isLoggedIn: boolean; username?: string }>()

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
            {isLoggedIn && username === params.username && (
              <Button variant={'outline'} asChild>
                <Link to={'/my/settings'}>Edit profile</Link>
              </Button>
            )}
            {isLoggedIn && username !== params.username && (
              <>
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
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">@{user.username}</span>
            <Badge variant="secondary">{user.role}</Badge>
            <Badge variant="outline" className="hover:bg-accent">
              <Link to={`/users/${user.username}/followers`}>{followers.length} followers</Link>
            </Badge>
            <Badge variant="outline" className="hover:bg-accent">
              <Link to={`/users/${user.username}/following`}>{following.length} following</Link>
            </Badge>
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
        <Outlet context={{ headline: user.headline, bio: user.bio, followers, following }} />
      </div>
    </div>
  )
}
