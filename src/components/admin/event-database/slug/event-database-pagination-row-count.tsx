"use client";
import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";
import { useDatabaseStore } from "@/stores/admin/databaseStore";
import React from "react";

function EventDatabasePaginationRowCount() {
  const { table, data } = useEventDatabaseTableContext();
  const { currentPage } = useDatabaseStore((state) => state);

  return (
    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
      {table.getRowModel().rows.length +
        (currentPage - 1) * table.getState().pagination.pageSize}{" "}
      of {data.totalResponsesCount} row(s) selected.
    </div>
  );
}

export default EventDatabasePaginationRowCount;
