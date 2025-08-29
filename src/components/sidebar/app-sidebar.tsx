import React from "react";
import { Sidebar } from "../ui/sidebar";
import SideBarHeader from "./side-bar-header";
import SideBarBody from "./side-bar-body";
import SideBarFooter from "./SideBarFooter";

function AppSidebar({...props} : React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SideBarHeader />
      <SideBarBody />
      <SideBarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
