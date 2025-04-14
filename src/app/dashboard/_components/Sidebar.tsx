"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Users,
  Phone,
  BriefcaseBusiness,
  AppWindowMac,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";

const menuItems = [
  {
    title: "Navbar",
    icon: BriefcaseBusiness,
    href: "/dashboard/navbar",
  },
  {
    title: "Banner",
    icon: Home,
    href: "/dashboard/banner",
  },
  {
    title: "About Us",
    icon: Users,
    href: "/dashboard/about-us",
  },
  {
    title: "Services",
    icon: AppWindowMac,
    href: "/dashboard/services",
  },
  {
    title: "Our Services",
    icon: AppWindowMac,
    href: "/dashboard/our-services",
  },
  {
    title: "Contact Us",
    icon: Phone,
    href: "/dashboard/contact-us",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="mt-10">
                <Link href="/">
                  <Image
                    src="/assets/logo.png"
                    alt="nav logo"
                    width={235}
                    height={90}
                    className="w-[200px] h-[60px] "
                  />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="mt-10 ">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <SidebarTrigger />
      </div>
    </>
  );
}
