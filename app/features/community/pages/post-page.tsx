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

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Discussion | wemake' }, { name: 'description', content: 'Discussion page' }]
}

export default function PostPage() {
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
              <Link to="/community?topic=productivity">Productivity</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community/postId">What is the best productivity tool?</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-20 items-start">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>10</span>
            </Button>
            <div className="space-y-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">What is the best productivity tool?</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>@nico</span>
                  <DotIcon className="size-5" />
                  <span>12 hours ago</span>
                  <DotIcon className="size-5" />
                  <span>10 replies</span>
                </div>
                <p className="text-muted-foreground w-3/4">
                  Hello, I'm looking for the best productivity tool. I've tried a lot of them, but I'm not sure which
                  one is the best. I have tried Notion, Trello, and Todoist, but I'm not sure which one is the best. Any
                  recommendations?
                </p>
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
                <h4 className="font-semibold">10 Replies</h4>
                <div className="flex flex-col gap-5">
                  <Reply
                    username="Nicolas"
                    avatarUrl="https://github.com/apple.png"
                    content="I've tried a lot of them, but I'm not sure which one is the best. I have tried Notion, Trello, and Todoist, but I'm not sure which one is the best. Any recommendations?"
                    createdAt="12 hours ago"
                    topLevel
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-5">
          <div className="flex gap-5">
            <Avatar>
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/facebook.png" />
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">Nicolas</h4>
              <Badge variant="secondary">Entrepreneur</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span>🎂 Joined 3 months ago</span>
            <span>🚀 Launched 10 products</span>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  )
}
