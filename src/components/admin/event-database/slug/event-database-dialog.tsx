"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useDatabaseStore } from "@/stores/admin/databaseStore";
import React from "react";
import AddValidationForm from "./add-validation-form";
import { Button } from "@/components/ui/button";
import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";

function EventDatabaseDialog() {
  const { isDialogOpen, formAction, id, payload } =
    useDatabaseStore((state) => state);
  const { handleOnSubmit, handleCloseDialog } = useEventDatabaseTableContext();

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => {
        handleCloseDialog();
      }}
    >
      <DialogContent className="flex flex-col max-h-2/3">
        <DialogTitle>Header</DialogTitle>
        <Separator />
        {formAction === "add-validation-column" && <AddValidationForm />}

        {formAction === "remove-validation-column" && <p>{formAction}</p>}

        {formAction === "edit-checkbox" && (
          <DialogDescription>
            Are you sure you want to proceed with this action? Once you check
            this box, the action will be applied and may not be easily
            reversible. <br></br>Please take a moment to review that this is
            truly what you intend to do before continuing.
          </DialogDescription>
        )}
        {formAction === "edit-input" && (
          <p>
            {id} && {payload}
          </p>
        )}

        <Separator />
        <DialogFooter>
          <Button onClick={() => handleOnSubmit(formAction)}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventDatabaseDialog;
