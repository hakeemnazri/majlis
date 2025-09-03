"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  getCoreRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { Calendar, EllipsisVertical, Loader } from "lucide-react";
import React, { createContext } from "react";
import { Event } from "../../generated/prisma";
import TableCellViewer from "@/components/admin/dashboard/table-cell-viewer";

type DashboardTableContextProviderProps = {
  data: Event[];
  children: React.ReactNode;
};

type TDashboardTableContext = {
  table: Table<Event>;
  columns: ColumnDef<Event>[];
};

export const DashboardTableContext =
  createContext<TDashboardTableContext | null>(null);

function DashboardTableContextProvider({
  data,
  children,
}: DashboardTableContextProviderProps) {
  const columns: ColumnDef<Event>[] = [
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
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <EllipsisVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DashboardTableContext.Provider value={{ table, columns }}>
      {children}
    </DashboardTableContext.Provider>
  );
}

export default DashboardTableContextProvider;
