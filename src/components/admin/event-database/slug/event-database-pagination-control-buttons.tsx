"use client";

import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";
import React from "react";
import EventDatabasePaginationRowsPerPage from "./event-database-pagination-rows-per-page";
import EventDatabasePaginationChevronButtons from "./event-database-pagination-chevron-buttons";

function EventDatabasePaginationControlButtons() {
  const { data, currentPage } = useEventDatabaseTableContext();
  return (
    <div className="flex w-full items-center gap-8 lg:w-fit">
      <EventDatabasePaginationRowsPerPage />

      <div className="flex w-fit items-center justify-center text-sm font-medium">
        Page {currentPage} of {data.totalPages}
      </div>

      <EventDatabasePaginationChevronButtons />
    </div>
  );
}

export default EventDatabasePaginationControlButtons;
