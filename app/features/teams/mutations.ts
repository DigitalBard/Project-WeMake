import type { SupabaseClient } from '@supabase/supabase-js'
import { z } from 'zod'
import type { Database } from '~/supa-client'
import { formSchema } from '../teams/pages/submit-team-page'

export const createTeam = async (
  client: SupabaseClient<Database>,
  team: z.infer<typeof formSchema>,
  userId: string
) => {
  const { data, error } = await client
    .from('teams')
    .insert({
      product_name: team.name,
      team_size: team.size,
      equity_split: team.equity,
      product_stage: team.stage as 'idea' | 'prototype' | 'mvp' | 'launched',
      roles: team.roles,
      product_description: team.description,
      team_leader_id: userId,
    })
    .select('team_id')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.team_id
}
