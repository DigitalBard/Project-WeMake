import { Link } from 'react-router'
import { Separator } from '~/common/components/ui/separator'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import { NavigationMenuList } from './ui/navigation-menu'
import { cn } from '~/lib/utils'
import { Button } from './ui/button'
import { UserIcon, SettingsIcon, LogOutIcon, BellIcon } from 'lucide-react' // 아이콘 임포트 - shadcn 설치 시 자동 설치되는 lucide-react 라이브러리 사용
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { DropdownMenu } from './ui/dropdown-menu'
import { AvatarFallback, AvatarImage } from './ui/avatar'
import { Avatar } from './ui/avatar'
import { BarChart3, MessageCircleIcon } from 'lucide-react'

const menus = [
  {
    name: 'Products',
    to: '/products',
    items: [
      {
        name: 'Leaderboards',
        description: 'See the top performers in your community',
        to: '/products/leaderboards',
      },
      {
        name: 'Categories',
        description: 'See the top categories in your community',
        to: '/products/categories',
      },
      {
        name: 'Search',
        description: 'Search for a product in your community',
        to: '/products/search',
      },
      {
        name: 'Submit a Product',
        description: 'Submit a product to the community',
        to: '/products/submit',
      },
      {
        name: 'Promote',
        description: 'Promote a product to the community',
        to: '/products/promote',
      },
    ],
  },
  {
    name: 'Jobs',
    to: '/jobs',
    items: [
      {
        name: 'Remote Jobs',
        description: 'See the remote jobs in your community',
        to: '/jobs?location=remote',
      },
      {
        name: 'Full-Time Jobs',
        description: 'See the full-time jobs in your community',
        to: '/jobs?type=full-time',
      },
      {
        name: 'Freelance Jobs',
        description: 'See the freelance jobs in your community',
        to: '/jobs?type=freelance',
      },
      {
        name: 'Internships',
        description: 'See the internships in your community',
        to: '/jobs?type=internship',
      },
      {
        name: 'Submit a Job',
        description: 'Submit a job to the community',
        to: '/jobs/submit',
      },
    ],
  },
  {
    name: 'Community',
    to: '/community',
    items: [
      {
        name: 'All Posts',
        description: 'See all posts in your community',
        to: '/community',
      },
      {
        name: 'Top Post',
        description: 'See the top post in your community',
        to: '/community?sort=top',
      },
      {
        name: 'New Post',
        description: 'See the new posts in your community',
        to: '/community?sort=new',
      },
      {
        name: 'Create a Post',
        description: 'Create a post to the community',
        to: '/community/create',
      },
    ],
  },
  {
    name: 'IdeasGPT',
    to: '/ideas',
  },
  {
    name: 'Teams',
    to: '/teams',
    items: [
      {
        name: 'All Teams',
        description: 'See all teams in your community',
        to: '/teams',
      },
      {
        name: 'Create a Team',
        description: 'Create a team to the community',
        to: '/teams/create',
      },
    ],
  },
]

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
}: {
  isLoggedIn: boolean
  hasNotifications: boolean
  hasMessages: boolean
}) {
  return (
    <nav className="flex fixed px-20 h-16 top-0 left-0 right-0 bg-background/50 items-center justify-between backdrop-blur z-50">
      <div className="flex items-center">
        <Link to="/" className="text-lg font-bold tracking-tighter">
          wemake
        </Link>
        <Separator orientation="vertical" className="h-6 mx-4" />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map(menu => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <Link to={menu.to} prefetch="intent">
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                        {menu.items?.map(item => (
                          <NavigationMenuItem
                            key={item.name}
                            // shadcn에서 조건부 클래스 설정하는 방법 - utils.ts의 cn 함수 사용
                            className={cn([
                              'select-none rounded-md transition-colors focus:bg-accent hover:bg-accent',
                              item.to === '/products/promote' &&
                                'col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20',
                              item.to === '/jobs/submit' &&
                                'col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20',
                            ])}>
                            {/* asChild 속성을 사용하면 부모 요소의 클래스를 가져올 수 있음 */}
                            {/* 이 경우 Link 요소에 NavigationMenuLink 요소의 스타일을 적용할 수 있음 */}
                            <NavigationMenuLink asChild>
                              <Link className="p-3 space-y-1 block leading-none no-underline outline-none" to={item.to}>
                                <span className="text-sm font-medium leading-none">{item.name}</span>
                                <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link className={navigationMenuTriggerStyle()} to={menu.to}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/notifications">
              <BellIcon className="size-4" />
              {hasNotifications && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />}
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/messages">
              <MessageCircleIcon className="size-4" />
              {hasMessages && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>we</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">@username</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/dashboard">
                    <BarChart3 className="size-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="size-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/auth/logout">
                  <LogOutIcon className="size-4 mr-2" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join">Join</Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
