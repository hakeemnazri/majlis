"use client";

import { setAdminDashboardPagination } from "@/actions/adminDashboard.action";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashboardTableContext } from "@/lib/hooks/contexts.hook";

function PaginationRowsPerPage() {
  const { table, setData } = useDashboardTableContext();
  const handleChangePageSize = async({page = 1, pageSize} : {page: number, pageSize: number}) => {
    const sendData = {
      page,
      pageSize
    }
    const data = await setAdminDashboardPagination(sendData);
    setData(data);
  }
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
          pageSize: parseInt(value)
        })
        table.setPageSize(Number(value))
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

export default PaginationRowsPerPage;
