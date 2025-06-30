import { Button } from '~/common/components/ui/button'
import { DotIcon, HeartIcon } from 'lucide-react'
import { EyeIcon } from 'lucide-react'
import type { Route } from './+types/idea-page'
import PageHeader from '~/common/components/page-header'
export const meta: Route.MetaFunction = () => {
  return [{ title: 'IdeaGPT | wemake' }, { name: 'description', content: 'Find ideas for your next project' }]
}

export default function IdeaPage() {
  return (
    <div className="">
      <PageHeader title="Idea #123" />
      <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">
          "A startup that creates an AI-powered generated personal trainer, deliveering customized fitness
          recommendations and tracking of progress using a mobile app to track workouts and progress as well as a
          website to manage the business."
        </p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>123</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span>12 hours ago</span>
          <DotIcon className="w-4 h-4" />
          <Button variant="outline">
            <HeartIcon className="w-4 h-4" />
            <span>12</span>
          </Button>
        </div>
        <Button className="size-lg">Claim idea now &rarr;</Button>
      </div>
    </div>
  )
}
