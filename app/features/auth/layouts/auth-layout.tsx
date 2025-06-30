import { FlickeringGrid } from 'components/magicui/flickering-grid'
import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      {/* <div className="bg-gradient-to-br from-primary hidden lg:block via-black/60 to-primary/50"></div> */}
      <FlickeringGrid color="hsl(var(--primary))" />
      <Outlet />
    </div>
  )
}
