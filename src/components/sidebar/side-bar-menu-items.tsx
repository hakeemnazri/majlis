"use client";

import { SIDEBAR_NAVIGATION } from "@/lib/constants/admin.constant";
import React, { useEffect } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useHeaderStore } from "@/stores/admin/headerStore";

function SideBarMenuItems() {
  const admin = "admin"; //TODO: put admin here
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const { setPage } = useHeaderStore((state) => state);

  useEffect(() => {
    if (lastSegment) {
      setPage(lastSegment);
    }
  }, [lastSegment, setPage]);

  return (
    <SidebarMenu>
      {SIDEBAR_NAVIGATION.map((item, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton isActive={lastSegment === item.link}>
            <Link
              href={`/app/${admin}/${item.link}`}
              className="flex items-center gap-2 w-full"
            >
              <item.icon className=" h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export default SideBarMenuItems;
