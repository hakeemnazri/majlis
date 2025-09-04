"use client";

import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import React from "react";
import { Button } from "../../ui/button";
import { useBuildEventContext } from "@/lib/hooks/contexts.hook";
import { formSchema2 } from "@/lib/schemas";
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
} from "../../ui/alert-dialog";
import { addEvent, editEvent } from "@/actions/adminBuildEvent.action";
import { toast } from "sonner";
import { ServerActionError, TAction } from "@/lib/types";
import {
  EVENT_FORM_SECOND_PAGE_DEFAULT_VALUES,
  EVENT_FORM_THIRD_PAGE_DEFAULT_VALUES,
} from "@/lib/constants/admin.constant";

type FormStageButtonsProps = {
  action?: TAction;
};

function FormStageButtons({ action = "create" }: FormStageButtonsProps) {
  const { validatePageFields, form } = useBuildEventContext();
  const {
    handleNextFormPage,
    handlePrevFormPage,
    formPage,
    handleResetFormPage,
    handleOnDialogClose,
  } = useBuildFormStore((state) => state);

  const handleNextPage = async () => {
    let isFieldValid = false;
    if (formPage === 0) {
      isFieldValid = await validatePageFields("firstPage");
    }
    if (formPage === 1) {
      isFieldValid = await validatePageFields("secondPage");
    }
    if (formPage === 2) {
      isFieldValid = await validatePageFields("thirdPage");
    }
    if (!isFieldValid) return;
    handleNextFormPage();
  };

  const handlePrevPage = () => {
    handlePrevFormPage();
  };

  const handleFormSubmit = async () => {
    const { getValues } = form;
    const formData = getValues();
    const parsedFormData = formSchema2(false).safeParse(formData);
    if (!parsedFormData.success) return;
    toast.promise(
      action === "create"
        ? addEvent(parsedFormData.data)
        : editEvent(parsedFormData.data),
      {
        loading: `${action === "create" ? "Adding" : "Editing"} event...`,
        success: (data) => {
          if (data.success && "message" in data) {
            handleResetFormPage();
            return data.message;
          }
          if (!data.success && "message" in data) {
            return data.message;
          }
          if ("error" in data) {
            throw new Error(data.error);
          }
          return `Event ${
            action === "create" ? "added" : "edited"
          } successfully!`;
        },
        error: (error: ServerActionError) =>
          error.error || "Failed to add event",
      }
    );
    handleOnDialogClose();
    form.reset({
      frequency: null,
      targetDonation: null,
      tickets: EVENT_FORM_SECOND_PAGE_DEFAULT_VALUES,
      survey: EVENT_FORM_THIRD_PAGE_DEFAULT_VALUES,
    });
  };

  return (
    <div className="flex justify-between w-full">
      {formPage !== 0 ? (
        <Button onClick={handlePrevPage}>Previous</Button>
      ) : (
        <div />
      )}
      {formPage < 3 ? (
        <Button onClick={handleNextPage}>next</Button>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Submit</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Please review all event details carefully before submitting.
                Once submitted, your event will be published and visible to the
                public. You can still edit it later if needed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleFormSubmit}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default FormStageButtons;
