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
import { EllipsisVertical, Loader } from "lucide-react";
import React, { createContext } from "react";
import { Event } from "../../generated/prisma";

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
      cell: ({ row }) => <p>{row.original.title}</p>,
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
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
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
