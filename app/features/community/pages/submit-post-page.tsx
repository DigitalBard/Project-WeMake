import PageHeader from '~/common/components/page-header'
import type { Route } from './+types/submit-post-page'
import { Form, redirect, useNavigation } from 'react-router'
import InputPair from '~/common/components/input-pair'
import SelectPair from '~/common/components/select-pair'
import { Button } from '~/common/components/ui/button'
import { makeSSRClient } from '~/supa-client'
import { getLoggedInUserId } from '~/features/users/queries'
import { getTopics } from '../queries'
import z from 'zod'
import { createPost } from '../mutations'
import { Loader2 } from 'lucide-react'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Create Discussion | wemake' }, { name: 'description', content: 'Create a discussion' }]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  await getLoggedInUserId(client)
  const topics = await getTopics(client)
  return { topics }
}

const formSchema = z.object({
  title: z.string().max(40),
  category: z.string().max(40),
  content: z.string().max(1000),
})

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)

  const formData = await request.formData()
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors }
  }

  const { title, category, content } = data
  const { post_id } = await createPost(client, {
    title,
    category,
    content,
    userId,
  })

  return redirect(`/community/${post_id}`)
}

export default function SubmitPostPage({ loaderData, actionData }: Route.ComponentProps) {
  const { topics } = loaderData
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting' || navigation.state === 'loading'

  return (
    <div className="space-y-10">
      <PageHeader
        title="Create Discussion"
        description="Ask questions, share ideas, and connect with other developers"
      />
      <Form className="space-y-10 max-w-screen-md mx-auto" method="post">
        <InputPair
          id="title"
          label="Title"
          name="title"
          description="(40 characters or less)"
          placeholder="i.e What is the best productivity tool?"
          required
        />
        {actionData && 'fieldErrors' in actionData && (
          <p className="text-red-500">{actionData.fieldErrors?.title?.join(', ')}</p>
        )}
        <SelectPair
          label="Category"
          name="category"
          description="Select the category that best fits your discussion"
          placeholder="i.e Productivity"
          options={topics.map(topic => ({ label: topic.name, value: topic.slug }))}
          required
        />
        {actionData && 'fieldErrors' in actionData && (
          <p className="text-red-500">{actionData.fieldErrors?.category?.join(', ')}</p>
        )}
        <InputPair
          id="content"
          label="Content"
          name="content"
          description="(1000 characters or less)"
          placeholder="i.e I'm looking for a new productivity tool that can help me manage my time better. What are the best tools out there?"
          required
          textArea
        />
        {actionData && 'fieldErrors' in actionData && (
          <p className="text-red-500">{actionData.fieldErrors?.content?.join(', ')}</p>
        )}
        <Button type="submit" className="w-full">
          {isSubmitting ? <Loader2 className="w-4 h-4 mr-2" /> : 'Create Discussion'}
        </Button>
      </Form>
    </div>
  )
}
