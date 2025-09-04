import React from 'react'
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function PaginationRowsPerPage() {
  return (
    <div className="hidden items-center gap-2 lg:flex">
    <Label htmlFor="rows-per-page" className="text-sm font-medium">
      Rows per page
    </Label>
    <Select value={`20`}>
      <SelectTrigger size="sm" className="w-20" id="rows-per-page">
        <SelectValue placeholder={"20"} />
      </SelectTrigger>
      <SelectContent side="top">
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <SelectItem key={pageSize} value={`${pageSize}`}>
            {pageSize}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  )
}

export default PaginationRowsPerPage