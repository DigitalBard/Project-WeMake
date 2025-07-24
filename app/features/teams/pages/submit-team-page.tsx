import PageHeader from '~/common/components/page-header'
import type { Route } from './+types/submit-team-page'
import { Form } from 'react-router'
import { Button } from '~/common/components/ui/button'
import InputPair from '~/common/components/input-pair'
import SelectPair from '~/common/components/select-pair'
import { PRODUCT_STAGES } from '~/features/teams/constants'
import { makeSSRClient } from '~/supa-client'
import { getLoggedInUserId } from '~/features/users/queries'
import { z } from 'zod'
import { createTeam } from '../mutations'
import { redirect } from 'react-router'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Create Team | wemake' }, { name: 'description', content: '새로운 팀을 등록해보세요' }]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  await getLoggedInUserId(client)
}

export const formSchema = z.object({
  name: z.string().max(20),
  stage: z.enum(PRODUCT_STAGES.map(stage => stage.value) as [string, ...string[]]),
  size: z.coerce.number().min(1).max(100),
  equity: z.coerce.number().min(1).max(100),
  roles: z.string(),
  description: z.string().max(200),
})

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)
  const formData = await request.formData()
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))

  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors }
  }

  const teamId = await createTeam(client, { ...data }, userId)
  return redirect(`/teams/${teamId}`)
}

export default function SubmitTeamPage({ actionData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <PageHeader title="Create Team" description="Create a new team to find a team mate." />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-20" method="post">
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair
            label="What is the name of your product?"
            placeholder="i.e. Dog Social Media"
            description="(20 characters max)"
            name="name"
            maxLength={20}
            type="text"
            id="name"
            required
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.name?.join(', ')}</p>
          )}
          <SelectPair
            label="What is the stage of your product?"
            description="Select the stage of your product"
            name="stage"
            required
            options={PRODUCT_STAGES}
            placeholder="Select the stage of your product"
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.stage?.join(', ')}</p>
          )}
          <InputPair
            label="What is the size of your team?"
            description="(1-100)"
            name="size"
            max={100}
            min={1}
            type="number"
            id="size"
            required
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.size?.join(', ')}</p>
          )}
          <InputPair
            label="How much equity are you willing to give?"
            description="(each)"
            name="equity"
            type="number"
            id="equity"
            min={1}
            max={100}
            required
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.equity?.join(', ')}</p>
          )}
          <InputPair
            label="What roles are you looking for?"
            placeholder="i.e. React Developer, Backend Developer, Product Manager"
            description="(comma separated)"
            name="roles"
            type="text"
            id="roles"
            required
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.roles?.join(', ')}</p>
          )}
          <InputPair
            label="What is the description of your product?"
            placeholder="i.e. We are building a new social media platform for dogs to connect with each other."
            description="(200 characters max)"
            name="description"
            type="text"
            id="description"
            maxLength={200}
            required
            textArea
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.description?.join(', ')}</p>
          )}
        </div>
        <Button type="submit" className="w-full max-w-sm" size={'lg'}>
          Create team
        </Button>
      </Form>
    </div>
  )
}
