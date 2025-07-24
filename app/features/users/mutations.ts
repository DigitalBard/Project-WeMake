import type { SupabaseClient } from '@supabase/supabase-js'
import type { z } from 'zod'
import type { Database } from '~/supa-client'
import { formSchema } from './pages/settings-page'

export const updateUser = async (
  client: SupabaseClient<Database>,
  data: z.infer<typeof formSchema>,
  userId: string
) => {
  const { error } = await client.from('profiles').update(data).eq('profile_id', userId)
  if (error) {
    throw new Error(error.message)
  }
}

export const updateUserAvatar = async (
  client: SupabaseClient<Database>,
  { avatarUrl, userId }: { avatarUrl: string; userId: string }
) => {
  const { error } = await client.from('profiles').update({ avatar: avatarUrl }).eq('profile_id', userId)
  if (error) {
    throw new Error(error.message)
  }
}
