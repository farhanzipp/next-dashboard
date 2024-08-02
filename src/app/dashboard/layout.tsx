'use client'
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./sidebar-nav"
import { LogoutButton } from "./logout-btn"

import Cookie from "js-cookie"
import { UserInfo } from "@/types"

const sidebarNavItems = [
  {
    title: "Config",
    href: "/dashboard",
  },
  {
    title: "Siswa",
    href: "/dashboard/psb",
    children: [
      {
        title: "Putra",
        href: "/dashboard/psb/putra",
      },
      {
        title: "Putri",
        href: "/dashboard/psb/putri",
      },
    ],
  },
  {
    title: "Appearance",
    href: "/dashboard/b",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const userInfoCookie = Cookie.get('user-info');
  const userInfo: UserInfo | undefined = userInfoCookie ? JSON.parse(userInfoCookie) : undefined;

  return (
    <>
      <div className=" p-10 pb-16 md:block">
        <div className="space-y-0.5 flex justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex gap-2 items-center">
            <LogoutButton
              userInfo={userInfo}
            />
            <p className="font-semibold">{userInfo?.username}</p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 w-1/3 lg:w-1/5 ">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
