import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Admin Login",
    description: "Login to admin console", 
    // metadata for admin login
  };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
}