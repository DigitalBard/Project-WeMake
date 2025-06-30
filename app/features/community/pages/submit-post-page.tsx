import PageHeader from '~/common/components/page-header'
import type { Route } from './+types/submit-post-page'
import { Form } from 'react-router'
import InputPair from '~/common/components/input-pair'
import SelectPair from '~/common/components/select-pair'
import { Button } from '~/common/components/ui/button'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Create Discussion | wemake' }, { name: 'description', content: 'Create a discussion' }]
}

export default function SubmitPostPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Create Discussion"
        description="Ask questions, share ideas, and connect with other developers"
      />
      <Form className="space-y-10 max-w-screen-md mx-auto">
        <InputPair
          id="title"
          label="Title"
          name="title"
          description="(40 characters or less)"
          placeholder="i.e What is the best productivity tool?"
          required
        />
        <SelectPair
          label="Category"
          name="category"
          description="Select the category that best fits your discussion"
          placeholder="i.e Productivity"
          options={[
            { label: 'Productivity', value: 'productivity' },
            { label: 'Programming', value: 'programming' },
            { label: 'Design', value: 'design' },
            { label: 'Other', value: 'other' },
          ]}
          required
        />
        <InputPair
          id="content"
          label="Content"
          name="content"
          description="(1000 characters or less)"
          placeholder="i.e I'm looking for a new productivity tool that can help me manage my time better. What are the best tools out there?"
          required
          textArea
        />
        <Button type="submit" className="w-full">
          Create Discussion
        </Button>
      </Form>
    </div>
  )
}
