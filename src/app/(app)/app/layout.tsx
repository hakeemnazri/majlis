import type { Metadata } from "next";
import "../../globals.css";
import MainAdminContainer from "@/components/admin/build-event/main-admin-container";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import Navbar from "@/components/admin/navbar/navbar";

export const metadata: Metadata = {
  title: "Admin Console",
  description: "Here is the admin console", 
  // metadata for admin console
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <MainAdminContainer>
          <Navbar />
          {children}
        </MainAdminContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}
