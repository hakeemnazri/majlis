import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";

function PaginationChevronButtons() {
  return (
    <div className="ml-auto flex items-center gap-2 lg:ml-0">
      <Button
        variant="outline"
        className="hidden h-8 w-8 p-0 lg:flex"
        // disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to first page</span>
        <ChevronsLeft />
      </Button>
      <Button
        variant="outline"
        className="size-8"
        size="icon"
        // disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        className="size-8"
        size="icon"
        // disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        className="hidden size-8 lg:flex"
        size="icon"
        // disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to last page</span>
        <ChevronsRight />
      </Button>
    </div>
  );
}

export default PaginationChevronButtons;
