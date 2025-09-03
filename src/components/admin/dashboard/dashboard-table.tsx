"use client";
import React from "react";
import TableData from "./table-data";
import DashboardHeaderButtons from "./dashboard-header-buttons";
import EditOrCreateDialog from "./edit-or-create-dialog";

function DashboardTable() {

  return (
    <section className="w-full flex flex-col justify-start gap-4">
      <DashboardHeaderButtons/>
      <TableData />
      <EditOrCreateDialog />
    </section>
  );
}

export default DashboardTable;
