import { getAdminDashboardEvents } from "@/lib/server-utils";

async function EditFormWrapper() {
  const events = await getAdminDashboardEvents();
  if (!events.success) {
    throw new Error(events.error);
  }

  return (
    // <Wrapper event={events.data} />
    <></>
  );
}

export default EditFormWrapper;
