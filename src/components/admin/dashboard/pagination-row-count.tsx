"use client";

import { useDashboardTableContext } from "@/lib/hooks/contexts.hook";
import React from "react";

function PaginationRowCount() {
  const { table, data, page } = useDashboardTableContext();
  return (
    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
      {table.getRowModel().rows.length + (page - 1 ) * table.getState().pagination.pageSize} of {data.totalCount} row(s)
      selected.
    </div>
  );
}

export default PaginationRowCount;
