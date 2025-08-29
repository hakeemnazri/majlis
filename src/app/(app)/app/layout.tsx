import type { Metadata } from "next";
import "../../globals.css";
import MainAdminContainer from "@/components/admin/build-event/main-admin-container";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainAdminContainer>
      <p>header</p>
      {children}
    </MainAdminContainer>
  );
}
