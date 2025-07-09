import { VALIDATE_FIRST_PAGE, VALIDATE_SECOND_PAGE } from "@/lib/constants/admin.constant";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import React from "react";
import { Button } from "../ui/button";
import { useBuildEventContext } from "@/lib/hooks/build-event-hooks";
import { TValidatePageFields } from "@/lib/types";

function FormStageButtons() {
  const {form} = useBuildEventContext();
  const { nextFormPage, prevFormPage, formPage, } = useBuildFormStore(
    (state) => state
  );
  const { trigger, watch, handleSubmit } = form;
  const category = watch("category");

  const handleNextPage = async () => {
    const isValid = await trigger(VALIDATE_FIRST_PAGE, { shouldFocus: true });
    if (!isValid) return;
    nextFormPage();
  };

  const handlePrevPage = () => {
    prevFormPage();
  };

  const handleFormSubmit = async () => {
    let validateFieldsArray = VALIDATE_SECOND_PAGE;
    if (category === "infaq") {
      validateFieldsArray = validateFieldsArray.filter(
        (field) => field !== "frequency"
      );
    }
    if (category !== "infaq" && category !== "premium") {
      const exclude: TValidatePageFields = ["donationTarget", "registerTickets"]
      validateFieldsArray = validateFieldsArray.filter(
        (field) => !exclude.includes(field) 
      );
    }

    if(category === "premium") {
      validateFieldsArray = validateFieldsArray.filter(
        (field) => field !== "donationTarget"
      );
    }

    const isValid = await trigger(validateFieldsArray, { shouldFocus: true });
    if(!isValid) return;

    await handleSubmit((data) => console.log(data), (error) => console.log(error))();
  };

  return (
    <div className="flex justify-between w-full">
      {formPage !== 0 ? (
        <Button onClick={handlePrevPage}>Previous</Button>
      ) : (
        <div />
      )}
      {formPage === 0 ? (
        <Button onClick={handleNextPage}>next</Button>
      ) : (
        <Button onClick={handleFormSubmit}>submit</Button>
      )}
    </div>
  );
}

export default FormStageButtons;
