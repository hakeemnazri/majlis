"use client";

import { setAdminEventDatabasePagination } from "@/actions/adminDatabase.action";
import { Button } from "@/components/ui/button";
import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";
import { useDatabaseStore } from "@/stores/admin/databaseStore";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function EventDatabasePaginationChevronButtons() {
  const {
    data,
    setData,
    table,
  } = useEventDatabaseTableContext();
  const { slug, isPaginationLoading, currentPage, setIsPaginatoinLoading } = useDatabaseStore((state) => state);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangePage = async (page: number) => {
    const pageSize = table.getState().pagination.pageSize;
    setIsPaginatoinLoading(true);

    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", page.toString());
    params.set("pageSize", pageSize.toString());

    router.push(`${pathname}?${params.toString()}`);
    const data = await setAdminEventDatabasePagination({
      page,
      pageSize,
      slug,
    });

    if (!data.success) {
      toast.error(data.error);
      return;
    }

    setData(data.events);
    setIsPaginatoinLoading(false);
  };
  
  return (
    <div className="ml-auto flex items-center gap-2 lg:ml-0">
      <Button
        variant="outline"
        className="hidden h-8 w-8 p-0 lg:flex"
        onClick={() => handleChangePage(1)}
        disabled={!data.canGetPreviousPage || isPaginationLoading}
      >
        <span className="sr-only">Go to first page</span>
        <ChevronsLeft />
      </Button>
      <Button
        variant="outline"
        className="size-8"
        size="icon"
        onClick={() =>
          handleChangePage(currentPage - 1)
        }
        disabled={!data.canGetPreviousPage || isPaginationLoading}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        className="size-8"
        size="icon"
        onClick={() => {
          handleChangePage(currentPage + 1);
        }}
        disabled={data.isFinalPage || isPaginationLoading}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        className="hidden size-8 lg:flex"
        size="icon"
        onClick={() => handleChangePage(data.totalPages)}
        disabled={data.isFinalPage || isPaginationLoading}
      >
        <span className="sr-only">Go to last page</span>
        <ChevronsRight />
      </Button>
    </div>
  );
}

export default EventDatabasePaginationChevronButtons;
