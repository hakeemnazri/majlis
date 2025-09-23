"use client";
import React from "react";
import TableData from "./table-data";
import EventDatabasePaginationControl from "./event-database-pagination-control";
import EventDatabaseHeaderButtons from "./event-database-header-buttons";
import EventDatabaseDialog from "./event-database-dialog";

function EventDatabaseTable() {
  return (
    <section className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 lg:px-6">
      <EventDatabaseHeaderButtons />
      <TableData />
      <EventDatabasePaginationControl />
      <EventDatabaseDialog />
    </section>
  );
}

export default EventDatabaseTable;
