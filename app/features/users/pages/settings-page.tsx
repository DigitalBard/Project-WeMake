import InputPair from '~/common/components/input-pair'
import type { Route } from './+types/settings-page'
import { Form } from 'react-router'
import SelectPair from '~/common/components/select-pair'
import { useState } from 'react'
import { Input } from '~/common/components/ui/input'
import { Label } from '~/common/components/ui/label'
import { Button } from '~/common/components/ui/button'
import { getLoggedInUserId, getUserById } from '../queries'
import { makeSSRClient } from '~/supa-client'
import { z } from 'zod'
import { updateUser, updateUserAvatar } from '../mutations'
import { Alert, AlertDescription, AlertTitle } from '~/common/components/ui/alert'
import { CheckCircleIcon } from 'lucide-react'

export const meta: Route.MetaFunction = () => {
  return [{ title: '설정' }, { name: 'description', content: '계정 설정' }]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)
  const user = await getUserById(client, { id: userId })
  return { user }
}

export const formSchema = z.object({
  name: z.string().min(1),
  role: z.enum(['Developer', 'Designer', 'Product Manager', 'Entrepreneur', 'Investor', 'Other']),
  headline: z.string().default(''),
  bio: z.string().default(''),
  // avatar: z.string().min(1),
})

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)

  const formData = await request.formData()
  const avatar = formData.get('avatar')
  if (avatar && avatar instanceof File) {
    if (avatar.size <= 2097152 && avatar.type.startsWith('image/')) {
      const { data, error } = await client.storage.from('avatars').upload(`${userId}/${Date.now()}`, avatar, {
        contentType: avatar.type,
        upsert: false,
      })
      if (error) {
        return { formErrors: { avatar: ['Failed to upload avatar'] } }
      }
      const {
        data: { publicUrl },
      } = client.storage.from('avatars').getPublicUrl(data.path)
      await updateUserAvatar(client, { avatarUrl: publicUrl, userId })
      return { ok: true }
    } else {
      return { formErrors: { avatar: ['File size must be less than 2MB and must be an image'] } }
    }
  } else {
    const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))
    if (!success) {
      return { formErrors: error.flatten().fieldErrors }
    }

    await updateUser(client, data, userId)
    return { ok: true }
  }
}

export default function SettingsPage({ loaderData, actionData }: Route.ComponentProps) {
  const { user } = loaderData
  const [avatar, setAvatar] = useState<string | null>(user.avatar)
  const onChangeIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setAvatar(URL.createObjectURL(file))
    }
  }

  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          {actionData?.ok && (
            <Alert className="bg-green-500/10 border-green-500">
              <CheckCircleIcon className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Profile updated successfully.</AlertDescription>
            </Alert>
          )}
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <Form className="flex flex-col gap-5 w-2/3" method="post">
            <InputPair
              label="Name"
              description="Your public name"
              required
              id="name"
              name="name"
              defaultValue={user.name}
              placeholder="John Doe"
            />
            {actionData?.formErrors && 'name' in actionData?.formErrors && (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors.name?.join(', ')}</AlertDescription>
              </Alert>
            )}
            <SelectPair
              label="Role"
              description="What role do you do identify the most with?"
              required
              name="role"
              defaultValue={user.role}
              placeholder="Select your role"
              options={[
                { label: 'Developer', value: 'Developer' },
                { label: 'Designer', value: 'Designer' },
                { label: 'Product Manager', value: 'Product Manager' },
                { label: 'Entrepreneur', value: 'Entrepreneur' },
                { label: 'Investor', value: 'Investor' },
                { label: 'Other', value: 'Other' },
              ]}
            />
            {actionData?.formErrors && 'role' in actionData?.formErrors && (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors.role?.join(', ')}</AlertDescription>
              </Alert>
            )}
            <InputPair
              label="Headline"
              description="An introduction to your profile"
              required
              id="headline"
              name="headline"
              defaultValue={user.headline ?? ''}
              placeholder="I'm a product designer based on the UK, I like doing product design, UI/UX, and web development."
              textArea
            />
            {actionData?.formErrors && 'headline' in actionData?.formErrors && (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors.headline?.join(', ')}</AlertDescription>
              </Alert>
            )}
            <InputPair
              label="Bio"
              description="Your public bio. It will be displayed on your profile page."
              required
              id="bio"
              name="bio"
              defaultValue={user.bio ?? ''}
              textArea
            />
            {actionData?.formErrors && 'bio' in actionData?.formErrors && (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors.bio?.join(', ')}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </Form>
        </div>
        {/* 파일 업로드 시에는 encType을 명시해줘야 함 */}
        <Form className="col-span-2 p-6 rounded-lg border shadow-md" method="post" encType="multipart/form-data">
          <Label className="flex flex-col gap-1">
            Avatar
            <small className="text-muted-foreground">This is your public avatar.</small>
          </Label>
          <div className="space-y-5">
            <div className="size-40 rounded-full shadow-xl overflow-hidden">
              {avatar && <img src={avatar} alt="uploaded avatar" className="object-cover w-full h-full" />}
            </div>
            <Input type="file" name="avatar" className="w-1/2" onChange={onChangeIcon} required />
            {actionData?.formErrors && 'avatar' in actionData?.formErrors && (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors.avatar.join(', ')}</AlertDescription>
              </Alert>
            )}
            <div className="flex flex-col text-xs">
              <span className=" text-muted-foreground">Recommended size: 128x128px</span>
              <span className=" text-muted-foreground">Allowed formats: PNG, JPG, SVG</span>
              <span className=" text-muted-foreground">Max file size: 2MB</span>
            </div>
            <Button className="w-full">Update Avatar</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
