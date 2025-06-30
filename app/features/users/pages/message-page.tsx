import { Form } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Card, CardDescription, CardHeader, CardTitle } from '~/common/components/ui/card'
import { Button } from '~/common/components/ui/button'
import { Textarea } from '~/common/components/ui/textarea'
import type { Route } from './+types/message-page'
import { SendIcon } from 'lucide-react'
import { MessageBubble } from '../components/message-bubble'

export const meta: Route.MetaFunction = () => {
  return [{ title: '메시지 상세' }, { name: 'description', content: '메시지 상세 내용' }]
}

export default function MessagePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="h-full flex flex-col justify-between">
      {/* real time을 이용한 로그인 여부 표시 추가하면 좋을 듯 */}
      <Card>
        <CardHeader className="flex flex-row gap-4 items-center">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>John Doe</CardTitle>
            <CardDescription>2 minutes ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <MessageBubble
            key={index}
            avatarUrl="https://github.com/stevejobs.png"
            fallback="S"
            content="this is a message from the user. make it long so that it can be scrolled"
            isCurrentUser={index % 2 === 0}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className="relative flex items-center justify-end">
            <Textarea placeholder="Type your message here..." className="resize-none" rows={2} />
            <Button type="submit" size="icon" className="absolute right-2">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  )
}
