import React from "react";
import TableData from "./table-data";
import EventDatabasePaginationControl from "./event-database-pagination-control";

function EventDatabaseTable() {
  return (
    <section className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 lg:px-6">
        <TableData/>
        <EventDatabasePaginationControl/>
    </section>
  );
}

export default EventDatabaseTable;
