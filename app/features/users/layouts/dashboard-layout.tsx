import { HomeIcon, RocketIcon, SparklesIcon } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '~/common/components/ui/sidebar'

export default function DashboardLayout() {
  const location = useLocation()

  return (
    <SidebarProvider>
      <Sidebar variant="floating" className="pt-16">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/my/dashboard'}>
                  <Link to="/my/dashboard">
                    <HomeIcon className="size-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/my/dashboard/ideas'}>
                  <Link to="/my/dashboard/ideas">
                    <SparklesIcon className="size-4" />
                    <span>Ideas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Product Analytics</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/my/dashboard/products'}>
                  <Link to="/my/dashboard/products/1">
                    <RocketIcon className="size-4" />
                    <span>Product 1</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full w-full">
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
