import OpenAI from 'openai'
import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'
import { insertIdeas } from '../mutations'
import { makeAdminClient } from '~/supa-client'
import type { Route } from './+types/generate-idea-page'

const openai = new OpenAI()

const IdeaSchema = z.object({
  title: z.string(),
  description: z.string({
    description: 'A short description of the idea. 100 characters max.',
  }),
  category: z.enum(['tech', 'business', 'marketing', 'health', 'education', 'entertainment', 'other']),
})

const ResponseSchema = z.object({
  ideas: z.array(IdeaSchema).length(10),
})

// cron job 생성 시 http request로 호출하는 방식을 사용하였으므로 action 함수를 사용함.
export const action = async ({ request }: Route.ActionArgs) => {
  // 1. endpoint 점검. 보안을 위해 오류 메시지 자체도 주지 않는 것이 중요.
  if (request.method !== 'POST') {
    return new Response(null, { status: 404 })
  }
  // 2. request header 점검. 보안을 위해 오류 메시지 자체도 주지 않는 것이 중요.
  const header = request.headers.get('X-POTATO')
  if (!header || header !== 'X-TOMATO') {
    return new Response(null, { status: 401 })
  }

  const completion = await openai.chat.completions.parse({
    model: 'o4-mini',
    messages: [
      {
        role: 'user',
        content: 'Give the name and elevator pitch of startup ideas that can be built by small teams of 1-3 people.',
      },
      {
        role: 'user',
        content:
          'For example, "A platform that allows users to create and share their own AI-generated images.", or "A platform that allows users to rent a coder per hour."',
      },
    ],
    response_format: zodResponseFormat(ResponseSchema, 'ideas'),
  })

  const descriptions = completion.choices[0].message.parsed?.ideas.map(idea => idea.description)

  if (!descriptions) {
    return Response.json(
      {
        error: 'No ideas generated',
      },
      { status: 400 }
    )
  }

  const { client } = makeAdminClient()
  await insertIdeas(client, descriptions)

  return Response.json({
    ok: true,
  })
}
