import { makeSSRClient } from '~/supa-client'

export const checkUsernameExists = async (request: Request, { username }: { username: string }) => {
  const { client } = makeSSRClient(request)
  const { error } = await client.from('profiles').select('username').eq('username', username).single()
  if (error) {
    return false
  }
  return true
}
