"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import TableCellViewer from "@/components/admin/dashboard/table-cell-viewer";
import { TEventPayload } from "@/lib/types";
import DashboardAlertDialogActionButton from "@/components/admin/dashboard/dashboard-alert-dialog-delete-button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import { useBuildEventContext } from "@/lib/hooks/contexts.hook";
import { EVENT_FORM_SECOND_PAGE_DEFAULT_VALUES, EVENT_FORM_THIRD_PAGE_DEFAULT_VALUES } from "@/lib/constants/admin.constant";
import BuildFormHeaders from "@/components/admin/build-event/build-form-headers";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import AnimContainer from "@/components/admin/build-event/anim-container";
import FormFirstPage from "@/components/admin/build-event/form-first-page";
import FormSecondPage from "@/components/admin/build-event/form-second-page";
import FormThirdPage from "@/components/admin/build-event/form-third-page";
import FormFourthPage from "@/components/admin/build-event/form-fourth-page";
import FormStageButtons from "@/components/admin/build-event/form-stage-buttons";
import ActionCell from "@/components/admin/dashboard/action-cell";

type DashboardTableContextProviderProps = {
  data: TEventPayload[];
  children: React.ReactNode;
};

type TDashboardTableContext = {
  table: Table<TEventPayload>;
  columns: ColumnDef<TEventPayload>[];
};

export const DashboardTableContext =
  createContext<TDashboardTableContext | null>(null);

function DashboardTableContextProvider({
  data,
  children,
}: DashboardTableContextProviderProps) {

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
      cell: ({ row }) => (
          <ActionCell row={row} />
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
