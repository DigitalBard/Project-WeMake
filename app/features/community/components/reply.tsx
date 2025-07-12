import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Button } from '~/common/components/ui/button'
import { DotIcon, MessageCircleIcon } from 'lucide-react'
import { Form, Link } from 'react-router'
import { useState } from 'react'
import { Textarea } from '~/common/components/ui/textarea'
import { DateTime } from 'luxon'

interface Reply {
  post_reply_id: number
  reply: string
  created_at: string
  user: { name: string; avatar: string | null; username: string }
}

interface ReplyProps {
  username: string
  avatarUrl: string | null
  content: string
  createdAt: string
  topLevel: boolean
  replies?: Reply[]
}

export function Reply({ username, avatarUrl, content, createdAt, topLevel, replies }: ReplyProps) {
  const [replying, setReplying] = useState(false)
  const toggleReplying = () => setReplying(prev => !prev)

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-start gap-5 w-4/5">
        <Avatar>
          <AvatarFallback>{username[0]}</AvatarFallback>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
        </Avatar>
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex items-center gap-2">
            <Link to={`/users/@${username}`}>
              <h4 className="font-medium">{username}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-xs text-muted-foreground">{DateTime.fromISO(createdAt).toRelative()}</span>
          </div>
          <p className="text-muted-foreground">{content}</p>
          <Button variant="ghost" className="self-end" onClick={toggleReplying}>
            <MessageCircleIcon className="size-4" />
            Reply
          </Button>
        </div>
      </div>
      {replying && (
        <div className="pl-10 w-full">
          <Form className="flex items-start gap-5">
            <Avatar>
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/apple.png" />
            </Avatar>
            <div className="flex flex-col gap-5 w-3/4 items-end">
              <Textarea placeholder="Write a reply" className="w-full resize-none" rows={5} />
              <Button type="submit">Reply</Button>
            </div>
          </Form>
        </div>
      )}
      {topLevel && replies && (
        <div className="pl-10 w-full">
          {replies.map(reply => (
            <Reply
              username={reply.user.name}
              avatarUrl={reply.user.avatar}
              content={reply.reply}
              createdAt={reply.created_at}
              topLevel={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}
