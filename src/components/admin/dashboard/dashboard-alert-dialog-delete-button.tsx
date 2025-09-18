"use client";

import { deleteEvent } from "@/actions/adminBuildEvent.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ServerActionError, TEventPayload } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";

type DashboardAlertDialogActionButtonProps = {
  event: TEventPayload;
};

function DashboardAlertDialogDeleteButton({
  event,
}: DashboardAlertDialogActionButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

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
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem 
          onSelect={(e) => {
            e.preventDefault();
            setDialogOpen(true);
          }}
        variant="destructive">Delete</DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete this event?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone, and the event data will be permanently
            deleted Please review all event details carefully before submitting.
            Once submitted, your event will be published and visible to the
            public. You can still edit it later if needed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
                handleDeleteEventDashboard(event.id);
                setDialogOpen(false);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DashboardAlertDialogDeleteButton;
