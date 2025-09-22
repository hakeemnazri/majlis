"use client";

import { Badge } from "@/components/ui/badge";
import {
  ColumnDef,
  getCoreRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { Calendar, Loader } from "lucide-react";
import React, { createContext, useState } from "react";
import TableCellViewer from "@/components/admin/dashboard/table-cell-viewer";
import { PaginatedEvents, TEventPayload } from "@/lib/types";
import ActionCell from "@/components/admin/dashboard/action-cell";

type EventDatabaseTableContextProviderProps = {
  fetchedData: PaginatedEvents;
  children: React.ReactNode;
};

type TEventDatabaseTableContext = {
  table: Table<TEventPayload>;
  columns: ColumnDef<TEventPayload>[];
  setData: React.Dispatch<React.SetStateAction<PaginatedEvents>>;
  data: PaginatedEvents;
//   isPaginationLoading: boolean;
//   setIsPaginatoinLoading: React.Dispatch<React.SetStateAction<boolean>>;
// TODO: pagination
};

export const DashboardTableContext =
  createContext<TEventDatabaseTableContext | null>(null);

function DashboardTableContextProvider({
  fetchedData,
  children,
}: EventDatabaseTableContextProviderProps) {
  const [data, setData] = useState(fetchedData);
//   const [isPaginationLoading, setIsPaginatoinLoading] = useState(false);

  const columns: ColumnDef<TEventPayload>[] = [
    {
      id: "title",
      header: "Event",
      accessorKey: "title",
      cell: ({ row }) => <TableCellViewer item={row.original} />,
    },
    {
      id: "createdAt",
      header: "Created On",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          <Calendar />
          {new Date(row.original.createdAt).toLocaleDateString("en-MY", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Badge>
      ),
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => <Badge variant="outline" className="text-muted-foreground px-1.5">
      <Loader />
      {row.original.category}
    </Badge>,
    },
    {
      id: "host",
      header: "Host",
      accessorKey: "host",
      cell: ({ row }) => <Badge variant="outline" className="text-muted-foreground px-1.5">
      <Loader />
      {row.original.host}
    </Badge>,
    },
    {
      id: "frequency",
      header: "Frequency",
      accessorKey: "frequency",
      cell: ({ row }) => <Badge variant="outline" className="text-muted-foreground px-1.5">
      <Loader />
      {row.original.frequency}
    </Badge>,
    },
    {
      id: "status",
      header: "Status",
      cell: () => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          <Loader />
          In Progress
        </Badge>
      ),
    },
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => <ActionCell row={row} />,
    },
  ];

  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DashboardTableContext.Provider
      value={{
        table,
        columns,
        data,
        setData,
        // isPaginationLoading,
        // setIsPaginatoinLoading
      }}
    >
      {children}
    </DashboardTableContext.Provider>
  );
}

export default DashboardTableContextProvider;
