import React from "react";
import TableData from "./table-data";
import DashboardHeaderButtons from "./dashboard-header-buttons";
import EditOrCreateDialog from "./edit-or-create-dialog";
import DashboardEditEventDialog from "./dashboard-edit-event-dialog";
import DashboardPaginationControl from "./dashboard-pagination-control";

function DashboardTable() {
  return (
    <section className="w-full flex flex-col justify-start gap-4 px-4 lg:px-6">
      <DashboardHeaderButtons />
      <TableData />
      <EditOrCreateDialog />
      <DashboardEditEventDialog />
      <DashboardPaginationControl />
    </section>
  );
}

export default DashboardTable;
