import React from "react";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

function SideBarFooter() {
  return (
    <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="data-[slot=sidebar-menu-button]:!p-1.5"
        >
          <Button>
            <LogOut className="size-5" />
            <span className="text-base font-semibold">Logout</span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
    </SidebarFooter>
  );
}

export default SideBarFooter;
