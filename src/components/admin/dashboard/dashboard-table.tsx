"use client";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Event } from "../../../../generated/prisma";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Loader, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

type DashboardTableProps = {
  eventsData: Event[];
};

function DashboardTable({ eventsData: data }: DashboardTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="w-full flex flex-col justify-start gap-4">
      <div className="flex items-center justify-end px-4 lg:px-6">
        <Button variant="outline" size="sm">
          <Plus />
          <span className="hidden lg:inline">Add Section</span>
        </Button>
      </div>

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.id === "actions" ? "w-12" : ""}
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
                      <TableCell key={cell.id}>
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

      
    </section>
  );
}

export default DashboardTable;
