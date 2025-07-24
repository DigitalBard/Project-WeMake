import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/supa-client'

export const claimIdea = async (
  client: SupabaseClient<Database>,
  { ideaId, userId }: { ideaId: number; userId: string }
) => {
  const { error } = await client
    .from('gpt_ideas')
    .update({
      claimed_at: new Date().toISOString(),
      claimed_by: userId,
    })
    .eq('gpt_idea_id', ideaId)

  if (error) {
    throw new Error(error.message)
  }
}
