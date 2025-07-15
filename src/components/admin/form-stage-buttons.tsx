import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import React from "react";
import { Button } from "../ui/button";
import { useBuildEventContext } from "@/lib/hooks/build-event-hooks";

function FormStageButtons() {
  const { validatePageFields, form } = useBuildEventContext();
  const { nextFormPage, prevFormPage, formPage } = useBuildFormStore(
    (state) => state
  );

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
    nextFormPage();
  };

  const handlePrevPage = () => {
    prevFormPage();
  };

  const handleFormSubmit = async () => {
    const { getValues } = form;
    const formData = getValues();
    console.log(formData);
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
        <Button onClick={handleFormSubmit}>submit</Button>
      )}
    </div>
  );
}

export default FormStageButtons;
