"use client";
import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";
import React from "react";
import EventDatabasePaginationRowsPerPage from "./event-database-pagination-rows-per-page";

function EventDatabasePaginationControlButtons() {
    const {table, data} = useEventDatabaseTableContext();
  return (
    <div className="flex w-full items-center gap-8 lg:w-fit">
      <EventDatabasePaginationRowsPerPage />

      <div className="flex w-fit items-center justify-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of {data.totalPages}
      </div>

      {/* <PaginationChevronButtons /> */}
    </div>
  );
}

export default EventDatabasePaginationControlButtons;
