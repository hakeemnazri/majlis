import React from "react";
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "../ui/sidebar";
import SideBarMenuItems from "./side-bar-menu-items";

function SideBarBody() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SideBarMenuItems />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

export default SideBarBody;
