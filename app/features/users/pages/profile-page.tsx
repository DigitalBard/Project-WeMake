import type { Route } from './+types/profile-page'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Profile | wemake' }, { name: 'description', content: '사용자 프로필 정보' }]
}

export default function ProfilePage() {
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div>
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">
          I'm a product designer based on the UK, I like doing product design, UI/UX, and web development.
        </p>
      </div>
      <div>
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">
          I'm a product designer based on the UK, I like doing product design, UI/UX, and web development.
        </p>
      </div>
    </div>
  )
}
