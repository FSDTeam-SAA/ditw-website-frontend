"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Phone,
  AppWindowMac,
  MessageCircleCode,
  LogOut,
  Menu,
  Notebook,
  CalendarCog,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { useState } from "react";
import LogoutModal from "@/components/shared/Modals/logoutModal";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { NavbarResponse } from "@/components/types/NavbarDataType";

const menuItems = [
  {
    title: "Navbar",
    icon: Menu,
    href: "/dashboard/navbar",
  },
  {
    title: "Banner",
    icon: Notebook,
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
    icon: CalendarCog,
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
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { data } = useQuery<NavbarResponse>({
    queryKey: ["navbar"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/navbar`).then((res) =>
        res.json()
      ),
  });

  const handleLogout = async () => {
    try {
      toast.success("You have successfully logged out!"); // Show toast first

      setTimeout(async () => {
        await signOut({ callbackUrl: "/" });
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again."); // Show error toast
    }
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="mt-10">
                <Link href="/">
                  <Image
                    src={data?.data?.logo ?? "/assets/logo.png"}
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
                <SidebarMenuButton
                  className=""
                  asChild
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    <item.icon className="size-4" />
                    <span
                      className={`${
                        pathname === item.href ? "font-bold" : "font-medium"
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="px-4 pb-6">
          
          <Link href="/dashboard/settings">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-4 text-lg font-medium text-black leading-[120%] shadow-none border-none"
            >
              <Settings className="text-black" /> Settings
            </Button>
          </div>
          </Link>
          <Button
            onClick={() => setIsOpen(true)}
            variant="destructive"
            className="w-full flex items-center justify-start gap-4 text-lg font-medium text-white leading-[120%] shadow-none border-none"
          >
            <LogOut className="text-white" /> Log out
          </Button>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Logout modal */}
      {isOpen && (
        <LogoutModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleLogout}
        />
      )}

      
      
      <div className="md:hidden fixed top-4 left-4 z-50">
        <SidebarTrigger />
      </div>
    </>
  );
}
