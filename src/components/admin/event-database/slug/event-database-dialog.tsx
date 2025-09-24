"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useDatabaseStore } from "@/stores/admin/databaseStore";
import React from "react";

function EventDatabaseDialog() {
  const { isDialogOpen, setDialogClose, formAction, id } = useDatabaseStore(
    (state) => state
  );
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogClose}>
      <DialogContent className="flex flex-col max-h-2/3">
        <DialogTitle>Header</DialogTitle>
        <Separator />
        {formAction === "add-validation-column" && <p>{formAction}</p>}
        {formAction === "remove-validation-column" && <p>{formAction}</p>}

        {id && <p>{id}</p>}
        <Separator />
        <DialogFooter>Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventDatabaseDialog;
