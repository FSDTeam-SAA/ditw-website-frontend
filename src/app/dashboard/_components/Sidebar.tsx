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

  const handleLogout = async () => {
    try {
      toast.success("You have successfully logged out!"); // Show toast first

      setTimeout(async () => {
        await signOut({ callbackUrl: "/" }); // Redirect after toast is shown
      }, 1000); // Wait for 1 seconds to let toast appear
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
                <SidebarMenuButton
                  className=""
                  asChild
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="px-4 pb-6">
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
