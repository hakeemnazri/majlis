"use client";

import { setAdminEventDatabasePagination } from "@/actions/adminDatabase.action";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";
import { useDatabaseStore } from "@/stores/admin/databaseStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function EventDatabasePaginationRowsPerPage() {
  const { table, setData } = useEventDatabaseTableContext();
  const { slug } = useDatabaseStore((state) => state);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangePageSize = async ({
    page = 1,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
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
            page: 1,
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
