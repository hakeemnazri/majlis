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
  setData: React.Dispatch<React.SetStateAction<PaginatedEvents>>;
  data: PaginatedEvents;
};

export const DashboardTableContext =
  createContext<TDashboardTableContext | null>(null);

function DashboardTableContextProvider({
  fetchedData,
  children,
}: DashboardTableContextProviderProps) {
  const [data, setData] = useState(fetchedData);

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
      cell: ({ row }) => <p>{row.original.category}</p>,
    },
    {
      id: "host",
      header: "Host",
      accessorKey: "host",
      cell: ({ row }) => <p>{row.original.host}</p>,
    },
    {
      id: "frequency",
      header: "Frequency",
      accessorKey: "frequency",
      cell: ({ row }) => <p>{row.original.frequency}</p>,
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
      }}
    >
      {children}
    </DashboardTableContext.Provider>
  );
}

export default DashboardTableContextProvider;
