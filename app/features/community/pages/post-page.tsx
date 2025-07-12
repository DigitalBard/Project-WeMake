import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/common/components/ui/breadcrumb'
import type { Route } from './+types/post-page'
import { Form, Link } from 'react-router'
import { ChevronUpIcon, DotIcon, Ghost, MessageCircleIcon } from 'lucide-react'
import { Button } from '~/common/components/ui/button'
import { Textarea } from '~/common/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Badge } from '~/common/components/ui/badge'
import { Reply } from '../components/reply'
import { getPostById, getReplies } from '../queries'
import { DateTime } from 'luxon'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Discussion | wemake' }, { name: 'description', content: 'Discussion page' }]
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const post = await getPostById(Number(params.postId))
  const replies = await getReplies(Number(params.postId))
  return { post, replies }
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { post, replies } = loaderData

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
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{post.upvotes}</span>
            </Button>
            <div className="space-y-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{post.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{post.author_name}</span>
                  <DotIcon className="size-5" />
                  <span>{DateTime.fromISO(post.created_at).toRelative()}</span>
                  <DotIcon className="size-5" />
                  <span>
                    {post.replies} {post.replies === 1 ? 'reply' : 'replies'}
                  </span>
                </div>
                <p className="text-muted-foreground w-3/4">{post.content}</p>
              </div>
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
              <div className="space-y-10">
                <h4 className="font-semibold">
                  {post.replies} {post.replies === 1 ? 'Reply' : 'Replies'}
                </h4>
                <div className="flex flex-col gap-5">
                  {replies.map(reply => (
                    <Reply
                      username={reply.user.name}
                      avatarUrl={reply.user.avatar}
                      content={reply.reply}
                      createdAt={reply.created_at}
                      topLevel={true}
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
              <h4 className="text-lg font-medium">{post.author_name}</h4>
              <Badge variant="secondary">{post.author_role}</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span>🎂 Joined {DateTime.fromISO(post.author_created_at).toRelative()}</span>
            <span>🚀 Launched {post.products} products</span>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  )
}
