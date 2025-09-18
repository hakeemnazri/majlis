"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import React from "react";
import BuildFormHeaders from "../build-event/build-form-headers";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import AnimContainer from "../build-event/anim-container";
import FormFirstPage from "../build-event/form-first-page";
import FormSecondPage from "../build-event/form-second-page";
import FormThirdPage from "../build-event/form-third-page";
import FormFourthPage from "../build-event/form-fourth-page";
import FormStageButtons from "../build-event/form-stage-buttons";
import {
  EVENT_FORM_SECOND_PAGE_DEFAULT_VALUES,
  EVENT_FORM_THIRD_PAGE_DEFAULT_VALUES,
} from "@/lib/constants/admin.constant";
import { useBuildEventContext } from "@/lib/hooks/contexts.hook";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";

function EditOrCreateDialog() {
  const {
    formPage,
    isDialogOpen,
    formAction,
    handleOnDialogClose,
  } = useBuildFormStore((state) => state);
  const { form } = useBuildEventContext();

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => {
        handleOnDialogClose();
        form.reset({
          tickets: EVENT_FORM_SECOND_PAGE_DEFAULT_VALUES,
          survey: EVENT_FORM_THIRD_PAGE_DEFAULT_VALUES,
        });
      }}
    >
      <DialogContent className="flex flex-col max-h-2/3">
        <DialogHeader>
          <BuildFormHeaders />
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex-1 overflow-scroll custom-scrollbar-dark"
          >
            <AnimContainer page={formPage}>
              {formPage === 0 && <FormFirstPage />}
              {formPage === 1 && <FormSecondPage />}
              {formPage === 2 && <FormThirdPage />}
              {formPage === 3 && <FormFourthPage />}
            </AnimContainer>
          </form>
        </Form>

        <Separator />

        <DialogFooter>
          <FormStageButtons action={formAction} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditOrCreateDialog;
