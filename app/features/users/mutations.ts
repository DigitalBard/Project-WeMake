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

export const sendMessage = async (
  client: SupabaseClient<Database>,
  { fromUserId, toUserId, content }: { fromUserId: string; toUserId: string; content: string }
) => {
  const { data, error } = await client.rpc('get_room', { from_user_id: fromUserId, to_user_id: toUserId }).maybeSingle()
  if (error) {
    throw new Error(error.message)
  }

  if (data?.message_room_id) {
    await client.from('messages').insert({
      message_room_id: data.message_room_id,
      sender_id: fromUserId,
      content,
    })

    return data.message_room_id
  } else {
    const { data: roomData, error: roomError } = await client
      .from('message_rooms')
      .insert({})
      .select('message_room_id')
      .single()

    if (roomError) {
      throw new Error(roomError.message)
    }

    await client.from('message_room_members').insert([
      {
        message_room_id: roomData.message_room_id,
        profile_id: fromUserId,
      },
      {
        message_room_id: roomData.message_room_id,
        profile_id: toUserId,
      },
    ])

    await client.from('messages').insert({
      message_room_id: roomData.message_room_id,
      sender_id: fromUserId,
      content,
    })

    return roomData.message_room_id
  }
}
