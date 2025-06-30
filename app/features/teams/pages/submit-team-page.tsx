import PageHeader from '~/common/components/page-header'
import type { Route } from './+types/submit-team-page'
import { Form } from 'react-router'
import { Button } from '~/common/components/ui/button'
import InputPair from '~/common/components/input-pair'
import SelectPair from '~/common/components/select-pair'
import { PRODUCT_STAGES } from '../constants'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Create Team | wemake' }, { name: 'description', content: '새로운 팀을 등록해보세요' }]
}

export default function SubmitTeamPage() {
  return (
    <div className="space-y-20">
      <PageHeader title="Create Team" description="Create a new team to find a team mate." />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-20">
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
          <SelectPair
            label="What is the stage of your product?"
            description="Select the stage of your product"
            name="stage"
            required
            options={PRODUCT_STAGES}
            placeholder="Select the stage of your product"
          />
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
          <InputPair
            label="What roles are you looking for?"
            placeholder="i.e. React Developer, Backend Developer, Product Manager"
            description="(comma separated)"
            name="roles"
            type="text"
            id="roles"
            required
          />
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
        </div>
        <Button type="submit" className="w-full max-w-sm" size={'lg'}>
          Create team
        </Button>
      </Form>
    </div>
  )
}
