import { Button } from '~/common/components/ui/button'
import { DotIcon, HeartIcon } from 'lucide-react'
import { EyeIcon } from 'lucide-react'
import type { Route } from './+types/idea-page'
import PageHeader from '~/common/components/page-header'
import { getGptIdea } from '../queries'
import { DateTime } from 'luxon'
import { makeSSRClient } from '~/supa-client'

export const meta: Route.MetaFunction = ({
  data: {
    idea: { gpt_idea_id },
  },
}: Route.MetaArgs) => {
  return [
    { title: `Idea #${gpt_idea_id} | wemake` },
    { name: 'description', content: 'Find ideas for your next project' },
  ]
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request)
  const { ideaId } = params

  const idea = await getGptIdea(client, {
    ideaId: Number(ideaId),
  })

  return { idea }
}

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  const { idea } = loaderData

  return (
    <div className="">
      <PageHeader title={`Idea #${idea.gpt_idea_id}`} />
      <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">{idea.idea}</p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>{idea.views}</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span>{DateTime.fromISO(idea.created_at).toRelative()}</span>
          <DotIcon className="w-4 h-4" />
          <Button variant="outline">
            <HeartIcon className="w-4 h-4" />
            <span>{idea.likes}</span>
          </Button>
        </div>
        <Button className="size-lg">Claim idea now &rarr;</Button>
      </div>
    </div>
  )
}
