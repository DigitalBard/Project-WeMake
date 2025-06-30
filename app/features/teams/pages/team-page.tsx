import PageHeader from '~/common/components/page-header'
import type { Route } from './+types/team-page'
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar'
import { Badge } from '~/common/components/ui/badge'
import { Button } from '~/common/components/ui/button'
import { Form } from 'react-router'
import InputPair from '~/common/components/input-pair'
import { Card, CardContent, CardHeader, CardTitle } from '~/common/components/ui/card'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Team Details | wemake' }, { name: 'description', content: '팀 정보를 확인해보세요' }]
}

export default function TeamPage() {
  return (
    <div className="space-y-10">
      <PageHeader title="Join lynn's team" />
      <div className="grid grid-cols-6 gap-20 items-start">
        <div className="col-span-4 grid grid-cols-4 gap-5">
          {[
            { title: 'Produt name', value: 'Dog Social Media' },
            { title: 'Stage', value: 'MVP' },
            { title: 'Team size', value: '3' },
            { title: 'Available equity', value: '50' },
          ].map(({ title, value }) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <CardContent className="p-0 font-bold text-2xl">
                  <p>{value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Looking for</CardTitle>
              <CardContent className="p-0 font-bold text-2xl">
                <ul className="text-lg list-disc list-inside">
                  {['React Developer', 'Backend Developer', 'Product Manager', 'UI/UX Designer'].map(role => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Idea description</CardTitle>
              <CardContent className="p-0 font-meidum text-xl">
                <p>We are building a new social media platform for dogs to connect with each other.</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-5">
          <div className="flex gap-5">
            <Avatar>
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/facebook.png" />
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">Nicolas</h4>
              <Badge variant="secondary">Entrepreneur</Badge>
            </div>
          </div>
          <Form className="space-y-5">
            <InputPair
              label="Introduce yourself"
              description="Tell us about yourself"
              placeholder="i.e. I'm a React Developer with 3 years of experience."
              name="introduction"
              type="text"
              id="introduction"
              required
              textArea
            />
            <Button type="submit" className="w-full">
              Get in touch
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  )
}
