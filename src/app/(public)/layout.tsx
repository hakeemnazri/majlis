import type { Metadata } from "next";
import "../globals.css";
import { BuildEventContextProvider } from "@/contexts/build-event-context-provider";

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
    <>
        <BuildEventContextProvider>{children}</BuildEventContextProvider>
    </>
  );
}
