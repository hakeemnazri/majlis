import React from "react";
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Hexagon } from "lucide-react";
import Link from "next/link";

function SideBarHeader() {
  return (
    <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="data-[slot=sidebar-menu-button]:!p-1.5"
        >
          <Link href="#">
            <Hexagon className="size-5" />
            <span className="text-base font-semibold">Majlis Baitussaadah</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
  );
}

export default SideBarHeader;
