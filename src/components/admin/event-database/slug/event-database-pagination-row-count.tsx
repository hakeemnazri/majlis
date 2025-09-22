"use client";
import { useEventDatabaseTableContext } from '@/lib/hooks/contexts.hook'
import React from 'react'

function EventDatabasePaginationRowCount() {
    const {table, data} = useEventDatabaseTableContext();
  return (
    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
    {table.getRowModel().rows.length} of {data.totalResponsesCount} row(s)
    selected.
  </div>
  )
}

export default EventDatabasePaginationRowCount