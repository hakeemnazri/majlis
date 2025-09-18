"use client";

import { useDashboardTableContext } from "@/lib/hooks/contexts.hook";
import PaginationChevronButtons from "./pagination-chevron-buttons";
import PaginationRowsPerPage from "./pagination-row-per-page";

function PaginationControlButtons() {
  const { table, data } = useDashboardTableContext();
  return (
    <div className="flex w-full items-center gap-8 lg:w-fit">
      <PaginationRowsPerPage />

      <div className="flex w-fit items-center justify-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {data.totalPages}
      </div>

      <PaginationChevronButtons />
    </div>
  );
}

export default PaginationControlButtons;
