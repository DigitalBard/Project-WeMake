import { makeSSRClient } from '~/supa-client'
import { getFollowingById } from '../queries'
import type { Route } from './+types/profile-following-page'
import { useFetcher, useOutletContext } from 'react-router'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Button } from '~/common/components/ui/button'

interface Following {
  following_profile: {
    username: string
    avatar: string
    name: string
  }
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const {
    data: { user },
  } = await client.auth.getUser()
  const followingOfUser = await getFollowingById(client, { userId: user?.id ?? null })
  return { followingOfUser }
}

export default function ProfileFollowingPage({ loaderData }: Route.ComponentProps) {
  const { following } = useOutletContext<{ following: Following[] }>()
  const { followingOfUser } = loaderData
  const fetcher = useFetcher()

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>, username: string) => {
    e.preventDefault()
    fetcher.submit(null, { method: 'post', action: `/users/${username}/follow` })
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Following</h1>
      <div className="flex flex-col gap-5">
        {following.map((user, index) => (
          <Card key={index} className="w-full flex flex-row justify-between items-center">
            <CardHeader className="flex flex-row gap-5 items-center space-y-0">
              <Avatar>
                <AvatarImage src={user.following_profile.avatar} alt={user.following_profile.username} />
                <AvatarFallback>{user.following_profile.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <CardTitle>{user.following_profile.name}</CardTitle>
                <CardDescription>@{user.following_profile.username}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="pt-6">
              {followingOfUser.some(f => f.following_profile.username === user.following_profile.username) ? (
                <Button variant="outline" onClick={e => handleFollow(e, user.following_profile.username)}>
                  Unfollow
                </Button>
              ) : (
                <Button variant="outline" onClick={e => handleFollow(e, user.following_profile.username)}>
                  Follow
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
