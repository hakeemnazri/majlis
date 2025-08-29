"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useHeaderStore } from "@/stores/admin/header";
import React from "react";

function NavTitle() {
  const { page } = useHeaderStore((state) => state);

  return (
    <>
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        className="mx-2 data-[orientation=vertical]:h-4"
      />
      <h1 className="text-lg font-bold">{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
    </>
  );
}

export default NavTitle;
