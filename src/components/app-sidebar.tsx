import * as React from "react"


import { NavMain } from "../components/nav-main"
import { NavUser } from "../components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { LayoutGrid, UserRoundCog, BookOpen, Settings2, Cog } from "lucide-react"

// This is sample data.
const data = {

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutGrid,
      isActive: true,
    },
    {
      title: "User Management",
      url: "/user-management",
      icon: UserRoundCog,

    },
    {
      title: "Subscriptions",
      url: "/subscriptions",
      icon: BookOpen,

    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: Settings2,

    },
    {
      title: "Settings",
      url: "/settings",
      icon: Cog,

    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { tenant, user } = props;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher tenant={tenant} />
        {/* {tenant.name} */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
