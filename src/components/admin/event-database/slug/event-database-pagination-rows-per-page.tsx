"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

function EventDatabasePaginationRowsPerPage() {
  const { table } = useEventDatabaseTableContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChangePageSize = async ({
    page = 2,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", page.toString());
    params.set("pageSize", pageSize.toString());

    window.location.href = `${pathname}?${params.toString()}`;
  };
  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Label htmlFor="rows-per-page" className="text-sm font-medium">
        Rows per page
      </Label>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={async (value) => {
          handleChangePageSize({
            page: 2,
            pageSize: parseInt(value),
          });
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger size="sm" className="w-20" id="rows-per-page">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 15, 20].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default EventDatabasePaginationRowsPerPage;
