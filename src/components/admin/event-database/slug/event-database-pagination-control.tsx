import React from "react";
import EventDatabasePaginationRowCount from "./event-database-pagination-row-count";
import EventDatabasePaginationControlButtons from "./event-database-pagination-control-buttons";

function EventDatabasePaginationControl() {
  return (
    <section className="flex items-center justify-between">
      <EventDatabasePaginationRowCount />
      <EventDatabasePaginationControlButtons />
    </section>
  );
}

export default EventDatabasePaginationControl;
