"use client";
import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";
import React from "react";

function EventDatabasePaginationRowCount() {
  const { table,data,currentPage } = useEventDatabaseTableContext();

  return (
    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
      {table.getRowModel().rows.length + (currentPage - 1 ) * table.getState().pagination.pageSize} of {data.totalResponsesCount} row(s)
      selected.
    </div>
  );
}

export default EventDatabasePaginationRowCount;
