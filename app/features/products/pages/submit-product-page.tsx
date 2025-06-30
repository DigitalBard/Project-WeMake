import { Form } from 'react-router'
import type { Route } from './+types/submit-product-page'
import PageHeader from '~/common/components/page-header'
import InputPair from '~/common/components/input-pair'
import SelectPair from '~/common/components/select-pair'
import { Label } from '~/common/components/ui/label'
import { Input } from '~/common/components/ui/input'
import { useState } from 'react'
import { Button } from '~/common/components/ui/button'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Submit Product | wemake' }, { name: 'description', content: 'Submit your product' }]
}

export default function SubmitPage({ loaderData, actionData }: Route.ComponentProps) {
  const [icon, setIcon] = useState<string | null>(null)
  const onChangeIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setIcon(URL.createObjectURL(file))
    }
  }

  return (
    <div className="">
      <PageHeader title="Submit Your Product" description="Share your product with the world." />
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="This is the name of your product."
            id="name"
            name="name"
            type="text"
            placeholder="Nmae of your product"
            required
          />
          <InputPair
            label="Tagline"
            description="60 characters or less"
            id="tagline"
            name="tagline"
            type="text"
            placeholder="A concise description of your product"
            required
          />
          <InputPair
            label="URL"
            description="The URL of your product."
            id="url"
            name="url"
            type="url"
            placeholder="https://example.com"
            required
          />
          <InputPair
            textArea
            label="Description"
            description="A detailed description of your product."
            id="description"
            name="description"
            placeholder="A detailed description of your product"
          />
          <SelectPair
            name="category"
            required
            label="Category"
            description="The category of your product."
            placeholder="Select a category"
            options={[
              { label: 'Category 1', value: 'category-1' },
              { label: 'Category 2', value: 'category-2' },
              { label: 'Category 3', value: 'category-3' },
            ]}
          />
          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="size-40 rounded-xl shadow-xl overflow-hidden">
            {icon && <img src={icon} alt="uploaded icon" className="object-cover w-full h-full" />}
          </div>
          <Label className="flex flex-col gap-1">
            Icon
            <small className="text-muted-foreground">This is the icon of your product.</small>
          </Label>
          <Input type="file" name="icon" className="w-1/2" onChange={onChangeIcon} required />
          <div className="flex flex-col text-xs">
            <span className=" text-muted-foreground">Recommended size: 128x128px</span>
            <span className=" text-muted-foreground">Allowed formats: PNG, JPG, SVG</span>
            <span className=" text-muted-foreground">Max file size: 1MB</span>
          </div>
        </div>
      </Form>
    </div>
  )
}
