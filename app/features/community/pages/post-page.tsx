import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/common/components/ui/breadcrumb'
import type { Route } from './+types/post-page'
import { Form, Link, useFetcher, useOutletContext } from 'react-router'
import { ChevronUpIcon, DotIcon } from 'lucide-react'
import { Button } from '~/common/components/ui/button'
import { Textarea } from '~/common/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Badge } from '~/common/components/ui/badge'
import { Reply } from '../components/reply'
import { getPostById, getReplies } from '../queries'
import { DateTime } from 'luxon'
import { makeSSRClient } from '~/supa-client'
import { z } from 'zod'
import { getLoggedInUserId, getFollowingById } from '~/features/users/queries'
import { createReply } from '../mutations'
import { useEffect, useRef } from 'react'
import { cn } from '~/lib/utils'

export const meta: Route.MetaFunction = ({
  data: {
    post: { title },
  },
}: Route.MetaArgs) => {
  return [{ title: `${title} | wemake` }, { name: 'description', content: 'Discussion page' }]
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const {
    data: { user },
  } = await client.auth.getUser()
  const post = await getPostById(client, { postId: Number(params.postId) })
  const replies = await getReplies(client, { postId: Number(params.postId) })
  const followingOfUser = await getFollowingById(client, { userId: user?.id ?? null })
  return { post, replies, followingOfUser }
}

const formSchema = z.object({
  reply: z.string(),
  topLevelId: z.coerce.number().optional(),
})

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)
  const formData = await request.formData()
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))

  if (!success) {
    return { formErrors: error.flatten().fieldErrors }
  }

  const { reply, topLevelId } = data
  await createReply(client, { postId: Number(params.postId), reply, userId, topLevelId })

  return { success: true }
}

export default function PostPage({ loaderData, actionData }: Route.ComponentProps) {
  const fetcher = useFetcher()
  const { post, replies, followingOfUser } = loaderData
  const { isLoggedIn, name, username, avatar } = useOutletContext<{
    isLoggedIn: boolean
    name?: string
    username?: string
    avatar?: string
  }>()
  const formRef = useRef<HTMLFormElement>(null)

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>, username: string) => {
    e.preventDefault()
    fetcher.submit(null, { method: 'post', action: `/users/${username}/follow` })
  }

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset()
    }
  }, [actionData?.success])

  return (
    <div className="space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community?topic=${post.topic_slug}`}>{post.topic_name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/${post.post_id}`}>{post.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-20 items-start">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <fetcher.Form method="post" action={`/community/${post.post_id}/upvote`}>
              <Button
                variant="outline"
                className={cn('flex flex-col h-14', post.is_upvoted ? 'bg-primary text-primary-foreground' : '')}>
                <ChevronUpIcon className="size-4 shrink-0" />
                <span>{post.upvotes}</span>
              </Button>
            </fetcher.Form>
            <div className="space-y-10 w-full">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{post.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link to={`/users/${post.author_username}`} className="hover:underline">
                    <span>{post.author_name}</span>
                  </Link>
                  <DotIcon className="size-5" />
                  <span>{DateTime.fromISO(post.created_at, { zone: 'utc' }).toRelative()}</span>
                  <DotIcon className="size-5" />
                  <span>
                    {post.replies} {post.replies === 1 ? 'reply' : 'replies'}
                  </span>
                </div>
                <p className="text-muted-foreground w-4/5">{post.content}</p>
              </div>
              <Form ref={formRef} className="flex items-start gap-5 w-4/5" method="post">
                <Avatar>
                  <AvatarFallback>{name ? name[0] : 'N'}</AvatarFallback>
                  <AvatarImage src={avatar} />
                </Avatar>
                <div className="flex flex-col gap-5 w-full items-end">
                  {isLoggedIn ? (
                    <Textarea name="reply" placeholder="Write a reply" className="w-full resize-none" rows={5} />
                  ) : (
                    <Textarea
                      name="reply"
                      placeholder="Please login to reply"
                      className="w-full resize-none"
                      rows={5}
                    />
                  )}
                  <Button type="submit" disabled={!isLoggedIn}>
                    Reply
                  </Button>
                </div>
              </Form>
              <div className="space-y-10">
                <h4 className="font-semibold">
                  {post.replies} {post.replies === 1 ? 'Reply' : 'Replies'}
                </h4>
                <div className="flex flex-col gap-5">
                  {replies.map(reply => (
                    <Reply
                      key={reply.post_reply_id}
                      name={reply.user.name}
                      username={reply.user.username}
                      avatarUrl={reply.user.avatar}
                      content={reply.reply}
                      createdAt={reply.created_at}
                      topLevel={true}
                      topLevelId={reply.post_reply_id}
                      replies={reply.post_replies}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-5 sticky top-20">
          <div className="flex gap-5">
            <Avatar>
              <AvatarFallback>{post.author_name[0]}</AvatarFallback>
              {post.author_avatar ? <AvatarImage src={post.author_avatar} /> : null}
            </Avatar>
            <div className="flex flex-col items-start">
              <Link to={`/users/${post.author_username}`} className="hover:underline">
                <h4 className="text-lg font-medium">{post.author_name}</h4>
              </Link>
              <Badge variant="secondary">{post.author_role}</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span>🎂 Joined {DateTime.fromISO(post.author_created_at, { zone: 'utc' }).toRelative()}</span>
            <span>🚀 Launched {post.products} products</span>
          </div>
          {post.author_username !== username &&
            (followingOfUser.some(f => f.following_profile.username === post.author_username) ? (
              <Button variant="outline" className="w-full" onClick={e => handleFollow(e, post.author_username)}>
                Unfollow
              </Button>
            ) : (
              <Button variant="outline" className="w-full" onClick={e => handleFollow(e, post.author_username)}>
                Follow
              </Button>
            ))}
        </aside>
      </div>
    </div>
  )
}
