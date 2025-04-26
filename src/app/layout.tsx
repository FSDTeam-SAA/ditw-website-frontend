import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppProvider from "@/components/Provider/AppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/Provider/SessionProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DITW - Home",
    template: "%s | DITW",
  },
  description: "DITW Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <AppProvider>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
            <Toaster position="top-right" />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}