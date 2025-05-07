import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/Sidebar";
import AuthWrapper from "@/components/Provider/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Simple responsive dashboard with sidebar navigation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <div className={inter.className}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <DashboardSidebar />
            <main className="flex-1">{children}</main>
          </div>
        </SidebarProvider>
      </div>
    </AuthWrapper>
  );
}
