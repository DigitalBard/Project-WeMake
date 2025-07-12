import { Link } from 'react-router'
import { Button } from '../../../common/components/ui/button'
import { Card, CardHeader, CardTitle, CardFooter } from '../../../common/components/ui/card'
import { Badge } from '../../../common/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../../common/components/ui/avatar'

interface TeamCardProps {
  id: number
  username: string
  avatarUrl: string | null
  positions: string[]
  projectDescription: string
}

export function TeamCard({ id, username, avatarUrl, positions, projectDescription }: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base leading-loose">
            <Badge variant="secondary" className="inline-flex shadow-sm items-center">
              <span>@{username}</span>
              <Avatar className="size-5">
                <AvatarFallback>{username[0]}</AvatarFallback>
                {avatarUrl && <AvatarImage src={avatarUrl} />}
              </Avatar>
            </Badge>
            <span> is looking for</span>
            {positions.map(position => (
              <Badge key={position} className="text-base">
                {position}
              </Badge>
            ))}
            <span> to build</span>
            <span> {projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button variant="link">Join team &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
