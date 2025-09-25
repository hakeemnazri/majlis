import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import EventResponseFormContextProvider from "@/contexts/event-response-form-context";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Majlis Baitussaadah",
  description: "Program-program dakwah Baitussaadah",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased min-h-screen w-full`}>
        <EventResponseFormContextProvider>
          {children}
        </EventResponseFormContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
