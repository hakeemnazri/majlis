import Wrapper from "@/components/wrapper";
import { getAdminDashboardEvents } from "@/lib/server-utils";

async function EditFormWrapper() {
  const events = await getAdminDashboardEvents();
  if (!events.success) {
    throw new Error(events.error);
  }

  return (
    <Wrapper event={[]} />
  );
}

export default EditFormWrapper;
