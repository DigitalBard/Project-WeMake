import { makeSSRClient } from '~/supa-client'
import { getFollowingById } from '../queries'
import type { Route } from './+types/profile-followers-page'
import { useFetcher, useOutletContext } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card'
import { Button } from '~/common/components/ui/button'

interface Follower {
  followers_profile: {
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

export default function ProfileFollowersPage({ loaderData }: Route.ComponentProps) {
  const { followers } = useOutletContext<{ followers: Follower[] }>()
  const { followingOfUser } = loaderData
  const fetcher = useFetcher()

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>, username: string) => {
    e.preventDefault()
    fetcher.submit(null, { method: 'post', action: `/users/${username}/follow` })
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Followers</h1>
      <div>
        {followers.map((user, index) => (
          <Card key={index} className="w-full flex flex-row justify-between items-center">
            <CardHeader className="flex flex-row gap-5 items-center space-y-0">
              <Avatar>
                <AvatarImage src={user.followers_profile.avatar} alt={user.followers_profile.username} />
                <AvatarFallback>{user.followers_profile.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <CardTitle>{user.followers_profile.name}</CardTitle>
                <CardDescription>@{user.followers_profile.username}</CardDescription>
              </div>
            </CardHeader>
            {followingOfUser.some(f => f.following_profile.username === user.followers_profile.username) ? (
              <CardFooter className="pt-6">
                <Button variant="outline" onClick={e => handleFollow(e, user.followers_profile.username)}>
                  Unfollow
                </Button>
              </CardFooter>
            ) : (
              <CardFooter className="pt-6">
                <Button variant="outline" onClick={e => handleFollow(e, user.followers_profile.username)}>
                  Follow
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
