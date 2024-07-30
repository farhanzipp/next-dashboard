'use client'
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./sidebar-nav"
import { LogoutButton } from "./logout-btn"
import Cookies from "js-cookie"
import axios from "axios"
import { useEffect, useState } from "react"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard",
  },
  {
    title: "Account",
    href: "/dashboard/a",
  },
  {
    title: "Appearance",
    href: "/dashboard/b",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

async function getUserData() {
  try {
    const token = Cookies.get('token');
    const response = await axios.get('https://dummyjson.com/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return response.data;
  } catch (error) {
    console.log("error", error)
  }
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData();
      setUserData(user);
    }
    fetchUserData();
  },[]);
  return (
    <>
      <div className=" p-10 pb-16 md:block">
        <div className="space-y-0.5 flex justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <LogoutButton />
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
