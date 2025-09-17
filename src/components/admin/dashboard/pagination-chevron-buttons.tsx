"use client";

import { setAdminDashboardPagination } from "@/actions/adminDashboard.action";
import { Button } from "@/components/ui/button";
import { useDashboardTableContext } from "@/lib/hooks/contexts.hook";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";

function PaginationChevronButtons() {
  const { data, table, setData } = useDashboardTableContext();

  const handleChangePage = async(page: number) => {
    const sendData = {
      page,
      pageSize: table.getState().pagination.pageSize
    }
    const data = await setAdminDashboardPagination(sendData);
    setData(data);
  }
  return (
    <div className="ml-auto flex items-center gap-2 lg:ml-0">
      <Button
        variant="outline"
        className="hidden h-8 w-8 p-0 lg:flex"
        onClick={() => handleChangePage(1)}
        disabled={!data.canGetPreviousPage}
      >
        <span className="sr-only">Go to first page</span>
        <ChevronsLeft />
      </Button>
      <Button
        variant="outline"
        className="size-8"
        size="icon"
        onClick={() => handleChangePage(table.getState().pagination.pageIndex + 1)}
        disabled={!data.canGetPreviousPage}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        className="size-8"
        size="icon"
        onClick={() => {handleChangePage(table.getState().pagination.pageIndex + 2);
        }}
        disabled={data.isFinalPage}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        className="hidden size-8 lg:flex"
        size="icon"
        onClick={() => handleChangePage(data.totalPages)}
        disabled={data.isFinalPage}
      >
        <span className="sr-only">Go to last page</span>
        <ChevronsRight />
      </Button>
    </div>
  );
}

export default PaginationChevronButtons;
