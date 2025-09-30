"use client";

import React from "react";
import { Event, Prisma, Survey, } from "../../../../../generated/prisma";
import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

export type EventData = {
  event: Event;
  responses: EventResponse[];
  totalResponsesCount: number;
  totalPages: number;
  currentPage: number;
  canGetPreviousPage: boolean;
  isFinalPage: boolean;
};

export type EventSurvey = {
  survey: Survey[];
}

export type EventResponse = Prisma.ResponseGetPayload<{
  include: {
    answer: {
      include: {
        survey: true;
      };
    };
    checklist: {
      include: {
        Validation: true;
      };
    };
    tag: {
      include: {
        AddedProps: true;
      };
    };
    upload: true;
    remark: true;
  };
}>;

export type EventWithSurvey = Prisma.EventGetPayload<{
  include:{
    survey: true,
  }
}>

function TableData() {
  const { table, columns } = useEventDatabaseTableContext();
  return (
      <div className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`${
                        header.column.id === "actions" ? "w-8" : ""
                      } px-4`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
  );
}

export default TableData;
