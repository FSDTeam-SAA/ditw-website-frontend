"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Users,
  Phone,
  BriefcaseBusiness,
  AppWindowMac,
  MessageCircleCode,
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
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

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
    title: "Our Services",
    icon: AppWindowMac,
    href: "/dashboard/our-services",
  },
  {
    title: "Managed Services",
    icon: AppWindowMac,
    href: "/dashboard/managed-services",
  },
  {
    title: "Contact Us",
    icon: Phone,
    href: "/dashboard/contact-us",
  },
  {
    title: "Review",
    icon: MessageCircleCode,
    href: "/dashboard/review",
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
        <SidebarContent className="mt-10 px-5">
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
          <div className="pt-20 md:pt-24 lg:pt-28 xl:pt-32">
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full "
              variant={"destructive"}
            >
              Log Out
            </Button>
          </div>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <SidebarTrigger />
      </div>
    </>
  );
}
