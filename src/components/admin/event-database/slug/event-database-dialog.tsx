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
import AddValidationForm from "./add-validation-form";
import { Button } from "@/components/ui/button";
import { useEventDatabaseTableContext } from "@/lib/hooks/contexts.hook";

function EventDatabaseDialog() {
  const { isDialogOpen, setDialogClose, formAction, id, setId, payload } = useDatabaseStore(
    (state) => state
  );
  const { handleOnSubmit, eventDatabaseForm } = useEventDatabaseTableContext();
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={() => {
      eventDatabaseForm.reset();
      setDialogClose();
      setId(null, formAction, false, undefined);
    }}>
      <DialogContent className="flex flex-col max-h-2/3">
        <DialogTitle>Header</DialogTitle>
        <Separator />
        {formAction === "add-validation-column" && <AddValidationForm />}
        {formAction === "remove-validation-column" && <p>{formAction}</p>}
        {formAction === "edit-input" && <p>{id} && {payload}</p>}

        <Separator />
        <DialogFooter>
          <Button onClick={() => handleOnSubmit(eventDatabaseForm.getValues())}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventDatabaseDialog;
