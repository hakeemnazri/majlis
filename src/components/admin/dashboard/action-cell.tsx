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
import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { ServerActionError, TEventPayload } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteEvent } from "@/actions/adminBuildEvent.action";
import { useBuildEventContext } from "@/lib/hooks/contexts.hook";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import DashboardAlertDialogDeleteButton from "./dashboard-alert-dialog-delete-button";

type ActionCellProps = {
  row: Row<TEventPayload>;
};

function ActionCell({ row }: ActionCellProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { handleEditEvent } = useBuildFormStore((state) => state);
  const { form } = useBuildEventContext();

  const handleEditEventDashboard = (event: TEventPayload) => {
    handleEditEvent();
    form.reset(event);
  };

  const handleDeleteEventDashboard = (eventId: string) => {
    toast.promise(deleteEvent(eventId), {
      loading: `deleting event...`,
      success: (data) => {
        if (data.success && "message" in data) {
          return data.message;
        }
        if (!data.success && "message" in data) {
          return data.message;
        }
        if ("error" in data) {
          throw new Error(data.error);
        }
        return `Event deleted successfully!`;
      },
      error: (error: ServerActionError) => error.error || "Failed to add event",
    });
  };

  return (
    <>
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

      {/* Delete Dialog */}
      {/* <AlertDialog
      open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure you want to delete this event?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone, and the event data will be
              permanently deleted. Please review all event details carefully
              before submitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteEventDashboard(row.original.id)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}

export default ActionCell;
