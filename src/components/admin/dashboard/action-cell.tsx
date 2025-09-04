"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { TEventPayload } from "@/lib/types";
import { useBuildEventContext } from "@/lib/hooks/contexts.hook";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import DashboardAlertDialogDeleteButton from "./dashboard-alert-dialog-delete-button";

type ActionCellProps = {
  row: Row<TEventPayload>;
};

function ActionCell({ row }: ActionCellProps) {

  const { handleEditEvent } = useBuildFormStore((state) => state);
  const { form } = useBuildEventContext();

  const handleEditEventDashboard = (event: TEventPayload) => {
    handleEditEvent();
    form.reset(event);
  };

  return (
      <DropdownMenu modal={false}>
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
          <DropdownMenuItem onClick={() => {handleEditEventDashboard(row.original)}}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DashboardAlertDialogDeleteButton event={row.original} />
        </DropdownMenuContent>
      </DropdownMenu>
  );
}

export default ActionCell;
