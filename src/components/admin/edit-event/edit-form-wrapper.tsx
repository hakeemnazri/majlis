import React from "react";
import { getAdminDashboardEvents } from "@/lib/server-utils";
import EventButtonList from "./event-button-list";
import { BuildEventContextProvider } from "@/contexts/build-event-context-provider";

async function EditFormWrapper() {
  const events  = await getAdminDashboardEvents();
 if(!events.success){
    throw new Error(events.error)
 }
  return (
    <>
      <BuildEventContextProvider>
        <EventButtonList events={events.data} />
      </BuildEventContextProvider>
    </>
  );
}

export default EditFormWrapper;
