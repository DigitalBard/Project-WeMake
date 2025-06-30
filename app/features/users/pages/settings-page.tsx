import InputPair from '~/common/components/input-pair'
import type { Route } from './+types/settings-page'
import { Form } from 'react-router'
import SelectPair from '~/common/components/select-pair'
import { useState } from 'react'
import { Input } from '~/common/components/ui/input'
import { Label } from '~/common/components/ui/label'
import { Button } from '~/common/components/ui/button'

export const meta: Route.MetaFunction = () => {
  return [{ title: '설정' }, { name: 'description', content: '계정 설정' }]
}

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null)
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
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <Form className="flex flex-col gap-5 w-1/2">
            <InputPair
              label="Name"
              description="Your public name"
              required
              id="name"
              name="name"
              placeholder="John Doe"
            />
            <SelectPair
              label="Role"
              description="What role do you do identify the most with?"
              required
              name="role"
              placeholder="Select your role"
              options={[
                { label: 'Developer', value: 'developer' },
                { label: 'Designer', value: 'designer' },
                { label: 'Product Manager', value: 'product-manager' },
                { label: 'Entrepreneur', value: 'entrepreneur' },
                { label: 'Investor', value: 'investor' },
                { label: 'Other', value: 'other' },
              ]}
            />
            <InputPair
              label="Headline"
              description="An introduction to your profile"
              required
              id="headline"
              name="headline"
              placeholder="I'm a product designer based on the UK, I like doing product design, UI/UX, and web development."
              textArea
            />
            <InputPair
              label="Bio"
              description="Your public bio. It will be displayed on your profile page."
              required
              id="bio"
              name="bio"
              textArea
            />
            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </Form>
        </div>
        <aside className="col-span-2 p-6 rounded-lg border shadow-md">
          <Label className="flex flex-col gap-1">
            Avatar
            <small className="text-muted-foreground">This is your public avatar.</small>
          </Label>
          <div className="space-y-5">
            <div className="size-40 rounded-full shadow-xl overflow-hidden">
              {avatar && <img src={avatar} alt="uploaded avatar" className="object-cover w-full h-full" />}
            </div>
            <Input type="file" name="icon" className="w-1/2" onChange={onChangeIcon} required />
            <div className="flex flex-col text-xs">
              <span className=" text-muted-foreground">Recommended size: 128x128px</span>
              <span className=" text-muted-foreground">Allowed formats: PNG, JPG, SVG</span>
              <span className=" text-muted-foreground">Max file size: 1MB</span>
            </div>
            <Button className="w-full">Update Avatar</Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
