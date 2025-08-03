import { Form, useOutletContext } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Card, CardDescription, CardHeader, CardTitle } from '~/common/components/ui/card'
import { Button } from '~/common/components/ui/button'
import { Textarea } from '~/common/components/ui/textarea'
import type { Route } from './+types/message-page'
import { SendIcon } from 'lucide-react'
import { MessageBubble } from '../components/message-bubble'
import { browserClient, makeSSRClient, type Database } from '~/supa-client'
import { getLoggedInUserId, getMessagesByRoomId, getRoomsParticipant, sendMessageToRoom } from '../queries'
import z from 'zod'
import { useEffect, useRef, useState } from 'react'

export const meta: Route.MetaFunction = () => {
  return [{ title: '메시지 상세' }, { name: 'description', content: '메시지 상세 내용' }]
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)
  const messages = await getMessagesByRoomId(client, { userId, messageRoomId: params.messageRoomId })
  const participant = await getRoomsParticipant(client, { userId, messageRoomId: params.messageRoomId })
  return { messages, participant }
}

const formSchema = z.object({
  message: z.string().min(1),
})

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)

  const formData = await request.formData()
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))
  if (!success) {
    return { formError: error.flatten().fieldErrors }
  }

  await sendMessageToRoom(client, { userId, messageRoomId: params.messageRoomId, message: data.message })

  return { ok: true }
}

export default function MessagePage({ loaderData, actionData }: Route.ComponentProps) {
  const { participant } = loaderData
  const { userId, name, avatar } = useOutletContext<{ userId: string; name: string; avatar: string }>()
  const formRef = useRef<HTMLFormElement>(null)
  const [messages, setMessages] = useState(loaderData.messages)

  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset()
    }
  }, [actionData])

  useEffect(() => {
    const changes = browserClient
      .channel(`room:${userId}-${participant.profile.profile_id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        payload => {
          setMessages(prev => [...prev, payload.new as Database['public']['Tables']['messages']['Row']])
        }
      )
      .subscribe()

    return () => {
      changes.unsubscribe()
    }
  }, [])

  return (
    <div className="h-full flex flex-col justify-between">
      {/* real time을 이용한 로그인 여부 표시 추가하면 좋을 듯 */}
      <Card>
        <CardHeader className="flex flex-row gap-4 items-center">
          <Avatar className="size-14">
            <AvatarImage src={participant.profile.avatar ?? ''} />
            <AvatarFallback>{participant.profile.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>{participant.profile.name}</CardTitle>
            <CardDescription>2 minutes ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll space-y-4 flex flex-col justify-start h-full">
        {messages.map(message => (
          <MessageBubble
            key={message.message_id}
            avatarUrl={message.sender_id === userId ? avatar : participant.profile.avatar ?? ''}
            fallback={message.sender_id === userId ? name[0] : participant.profile.name[0]}
            content={message.content}
            isCurrentUser={message.sender_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form ref={formRef} method="post" className="relative flex items-center justify-end">
            <Textarea
              placeholder="Type your message here..."
              className="resize-none"
              rows={2}
              name="message"
              required
            />
            <Button type="submit" size="icon" className="absolute right-2">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  )
}

// form 제출 시, 혹은 fetcher로 get, post 요청 시 데이터를 다시 불러오지 않도록(loader 호출 안함) 설정
export const shouldRevalidate = () => false
