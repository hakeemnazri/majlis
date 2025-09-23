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

type DashboardTableContextProviderProps = {
  fetchedData: PaginatedEvents;
  children: React.ReactNode;
};

type TDashboardTableContext = {
  table: Table<TEventPayload>;
  columns: ColumnDef<TEventPayload>[];
  isPaginationLoading: boolean;
  setIsPaginatoinLoading: React.Dispatch<React.SetStateAction<boolean>>;
  data: PaginatedEvents;
  setData: React.Dispatch<React.SetStateAction<PaginatedEvents>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const DashboardTableContext =
  createContext<TDashboardTableContext | null>(null);

function DashboardTableContextProvider({
  fetchedData,
  children,
}: DashboardTableContextProviderProps) {
  const [data, setData] = useState(fetchedData);
  const [page, setPage] = useState(1);
  const [isPaginationLoading, setIsPaginatoinLoading] = useState(false);

  const columns: ColumnDef<TEventPayload>[] = [
    {
      id: "title",
      header: () => <div className="text-left">Event</div>,
      accessorKey: "title",
      cell: ({ row }) => <TableCellViewer item={row.original} />,
    },
    {
      id: "createdAt",
      header: () => <div className="text-center">Created On</div>,
      accessorKey: "createdAt",
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
      header: () => <div className="text-center">Category</div>,
      accessorKey: "category",
      cell: ({ row }) => <Badge variant="outline" className="text-muted-foreground px-1.5">
      <Loader />
      {row.original.category}
    </Badge>,
    },
    {
      id: "host",
      header: () => <div className="text-center">Host</div>,
      accessorKey: "host",
      cell: ({ row }) => <Badge variant="outline" className="text-muted-foreground px-1.5">
      <Loader />
      {row.original.host}
    </Badge>,
    },
    {
      id: "frequency",
      header: () => <div className="text-center">Frequency</div>,
      accessorKey: "frequency",
      cell: ({ row }) => <Badge variant="outline" className="text-muted-foreground px-1.5">
      <Loader />
      {row.original.frequency}
    </Badge>,
    },
    {
      id: "status",
      header: () => <div className="text-center">Status</div>,
      accessorKey: "status",
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
      accessorKey: "actions",
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
        isPaginationLoading,
        setIsPaginatoinLoading,
        page,
        setPage,
      }}
    >
      {children}
    </DashboardTableContext.Provider>
  );
}

export default DashboardTableContextProvider;
