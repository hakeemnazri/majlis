"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useDatabaseStore } from "@/stores/admin/databaseStore";
import React from "react";
import AddValidationForm from "./add-validation-form";
import { Button } from "@/components/ui/button";
import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";

function EventDatabaseDialog() {
  const { isDialogOpen, formAction } = useDatabaseStore(
    (state) => state
  );
  const { handleOnSubmit, handleCloseDialog } = useEventDatabaseTableContext();

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => {
        handleCloseDialog();
      }}
    >
      <DialogContent className="flex flex-col max-h-2/3">
        <DialogTitle>
          {formAction === "add-validation-column" && "Add Validation Column"}
          {formAction === "remove-validation-column" &&
            "Remove Validation Column"}
          {formAction === "edit-checkbox" && "Edit Validation Checkbox"}
          {formAction === "edit-input" && "Edit Responses Data"}
        </DialogTitle>
        <Separator />
        {formAction === "add-validation-column" && <AddValidationForm />}
        {formAction === "remove-validation-column" && <p>{formAction}</p>}
        {(formAction === "edit-checkbox" || formAction === "edit-input") && (
          <>
            <DialogHeader>
              Are you sure you want to proceed with this action?
            </DialogHeader>
            <div className="space-y-2">
              <DialogDescription>
                Once you proceed, the action will be applied and previous data will be lost.
              </DialogDescription>
              <DialogDescription>
                Please take a moment to review that this is truly what you
                intend to do before continuing.
              </DialogDescription>
            </div>
          </>
        )}

        <Separator />
        <DialogFooter>
          <Button onClick={() => handleOnSubmit(formAction)}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventDatabaseDialog;
