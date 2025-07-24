import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Button } from '~/common/components/ui/button'
import { DotIcon, MessageCircleIcon } from 'lucide-react'
import { Form, Link, useActionData, useOutletContext } from 'react-router'
import { useEffect, useState } from 'react'
import { Textarea } from '~/common/components/ui/textarea'
import { DateTime } from 'luxon'
import type { action } from '../pages/post-page'

interface Reply {
  post_reply_id: number
  reply: string
  created_at: string
  user: { name: string; avatar: string | null; username: string }
}

interface ReplyProps {
  name: string
  username: string
  avatarUrl: string | null
  content: string
  createdAt: string
  topLevel: boolean
  topLevelId: number
  replies?: Reply[]
}

export function Reply({ name, username, avatarUrl, content, createdAt, topLevel, topLevelId, replies }: ReplyProps) {
  const actionData = useActionData<typeof action>()
  const [replying, setReplying] = useState(false)
  const toggleReplying = () => setReplying(prev => !prev)
  const {
    isLoggedIn,
    name: loggedInName,
    avatar,
  } = useOutletContext<{
    isLoggedIn: boolean
    name?: string
    avatar?: string
  }>()

  useEffect(() => {
    if (actionData?.success) {
      setReplying(false)
    }
  }, [actionData?.success])

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-start gap-5 w-4/5">
        <Avatar>
          <AvatarFallback>{name[0]}</AvatarFallback>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
        </Avatar>
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex items-center gap-2">
            <Link to={`/users/${username}`}>
              <h4 className="font-medium">{name}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-xs text-muted-foreground">{DateTime.fromISO(createdAt).toRelative()}</span>
          </div>
          <p className="text-muted-foreground">{content}</p>
          {isLoggedIn && (
            <Button variant="ghost" className="self-end" onClick={toggleReplying}>
              <MessageCircleIcon className="size-4" />
              Reply
            </Button>
          )}
        </div>
      </div>
      {replying && (
        <div className="px-10 w-full">
          <Form className="flex items-start gap-5" method="post">
            <input type="hidden" name="topLevelId" value={topLevelId} />
            <Avatar>
              <AvatarFallback>{loggedInName ? loggedInName[0] : 'N'}</AvatarFallback>
              <AvatarImage src={avatar} />
            </Avatar>
            <div className="flex flex-col gap-5 w-3/4 items-end">
              <Textarea
                name="reply"
                placeholder="Write a reply"
                className="w-full resize-none"
                defaultValue={`@${username}`}
                rows={5}
              />
              <Button type="submit">Reply</Button>
            </div>
          </Form>
        </div>
      )}
      {topLevel && replies && (
        <div className="pl-10 w-full">
          {replies.map(reply => (
            <Reply
              key={reply.post_reply_id}
              name={reply.user.name}
              username={reply.user.username}
              avatarUrl={reply.user.avatar}
              content={reply.reply}
              createdAt={reply.created_at}
              topLevel={false}
              topLevelId={topLevelId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
