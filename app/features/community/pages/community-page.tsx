import PageHeader from '~/common/components/page-header'
import type { Route } from './+types/community-page'
import { data, Form, Link, useSearchParams } from 'react-router'
import { Button } from '~/common/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/common/components/ui/dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { PERIOD_OPTIONS, SORT_OPTIONS } from '../constants'
import { Input } from '~/common/components/ui/input'
import { PostCard } from '../components/post-card'
import { getPosts, getTopics } from '../queries'
import z from 'zod'
import { makeSSRClient } from '~/supa-client'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Community | wemake' }, { name: 'description', content: 'Community page' }]
}

const searchParamsSchema = z.object({
  sorting: z.enum(SORT_OPTIONS).optional().default(SORT_OPTIONS[0]),
  period: z.enum(PERIOD_OPTIONS).optional().default(PERIOD_OPTIONS[0]),
  keyword: z.string().optional(),
  topic: z.string().optional(),
})

export const loader = async ({ request }: Route.LoaderArgs) => {
  // 순차 실행
  // const topics = await getTopics()
  // const posts = await getPosts()
  // 병렬 실행
  const url = new URL(request.url)
  const { success, data: parsedData } = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams))

  if (!success) {
    throw data(
      {
        error_code: 'invalid_params',
        message: 'Invalid params',
      },
      { status: 400 }
    )
  }

  const { client, headers } = makeSSRClient(request)
  const [topics, posts] = await Promise.all([
    getTopics(client),
    getPosts(client, {
      limit: 10,
      sorting: parsedData.sorting,
      period: parsedData.period,
      keyword: parsedData.keyword,
      topic: parsedData.topic,
    }),
  ])
  return { topics, posts }
}

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const { topics, posts } = loaderData
  const [searchParams, setSearchParams] = useSearchParams()
  const sorting = searchParams.get('sorting') || SORT_OPTIONS[0]
  const period = searchParams.get('period') || PERIOD_OPTIONS[0]

  return (
    <div>
      <PageHeader title="Community" description="Ask questions, share ideas, and connect with other developers" />
      <div className="grid grid-cols-6 items-start gap-40">
        <div className="col-span-4 space-y-10">
          <div className="flex justify-between">
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <span className="text-sm capitalize">{sorting}</span>
                    <ChevronDownIcon className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map(option => (
                      <DropdownMenuCheckboxItem
                        className="cursor-pointer capitalize"
                        key={option}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set('sorting', option)
                            setSearchParams(searchParams)
                          }
                        }}>
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === 'popular' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <span className="text-sm capitalize">{period}</span>
                      <ChevronDownIcon className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map(option => (
                        <DropdownMenuCheckboxItem
                          className="cursor-pointer capitalize"
                          key={option}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              searchParams.set('period', option)
                              setSearchParams(searchParams)
                            }
                          }}>
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className="w-2/3">
                <Input type="text" name="keyword" placeholder="Search for discussions" />
              </Form>
            </div>
            <Button asChild>
              <Link to="/community/submit">Create Discussion</Link>
            </Button>
          </div>
          <div className="space-y-5">
            {posts.map(post => (
              <PostCard
                key={post.post_id}
                id={post.post_id}
                title={post.title}
                author={post.author}
                avatarUrl={post.author_avatar}
                category={post.topic}
                createdAt={post.created_at}
                votesCount={post.upvotes}
                isUpvoted={post.is_upvoted}
                expanded
              />
            ))}
          </div>
        </div>
        <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">Topics</span>
          <div className="flex flex-col gap-4 items-start">
            {topics.map(topic => (
              <Button variant="link" asChild key={topic.slug} className="pl-0">
                <Link to={`/community?topic=${topic.slug}`}>{topic.name}</Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
