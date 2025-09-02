"use client";
import React from "react";
import TableData from "./table-data";
import DashboardHeaderButtons from "./dashboard-header-buttons";

function DashboardTable() {

  return (
    <section className="w-full flex flex-col justify-start gap-4">
      <DashboardHeaderButtons/>
      <TableData />
      
    </section>
  );
}

export default DashboardTable;
