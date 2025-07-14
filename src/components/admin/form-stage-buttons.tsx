import {
  VALIDATE_FIRST_PAGE,
  VALIDATE_SECOND_PAGE,
} from "@/lib/constants/admin.constant";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import React from "react";
import { Button } from "../ui/button";
import { useBuildEventContext } from "@/lib/hooks/build-event-hooks";
import { TForm, TValidatePageFields } from "@/lib/types";
import { FieldPath, UseFormReturn } from "react-hook-form";

function FormStageButtons() {
  const { form } = useBuildEventContext();
  const { nextFormPage, prevFormPage, formPage } = useBuildFormStore(
    (state) => state
  );

  const handleNextPage = async () => {
    let isFieldValid = false;
    if (formPage === 0) {
      isFieldValid = await validatePageFields("firstPage", form);
    }
    if(formPage === 1){
      isFieldValid = await validatePageFields("secondPage", form);
    }
    if(formPage === 2){
      isFieldValid = await validatePageFields("thirdPage", form);
    }
    console.log(isFieldValid);
    if (!isFieldValid) return;
    nextFormPage();
  };

  const handlePrevPage = () => {
    prevFormPage();
  };

  const handleFormSubmit = async () => {
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

const validatePageFields = async (
  action: string,
  form: UseFormReturn<TForm>
) => {
  const { trigger, watch } = form;
  const category = watch("category");
  const survey = watch("survey")
  let isValid = false;

  if (action === "firstPage") {
    isValid = await trigger(VALIDATE_FIRST_PAGE, { shouldFocus: true });
    return isValid;
  }
  
  if (action === "secondPage") {
    let validateFieldsArray = VALIDATE_SECOND_PAGE;
    if (category === "infaq") {
      validateFieldsArray = validateFieldsArray.filter(
        (field) => field !== "frequency"
      );
    }
    if (category !== "infaq" && category !== "premium") {
      const exclude: TValidatePageFields = [
        "donationTarget",
        "registerTickets",
      ];
      validateFieldsArray = validateFieldsArray.filter(
        (field) => !exclude.includes(field)
      );
    }
    
    if (category === "premium") {
      validateFieldsArray = validateFieldsArray.filter( 
        (field) => field !== "donationTarget"
      );
    }
    isValid = await trigger(validateFieldsArray, { shouldFocus: true });
    return isValid;
  }
  
  if (action === "thirdPage") {
    const validateThirdPage = survey.flatMap((question, index) => {
      if(question.type === "short answer" || question.type === "paragraph"){
        return ["survey." + index + ".question", "survey." + index + ".type"];
      }

      if(question.type === "mutliple choice" || question.type === "checkboxes"){
        const validateSurveyQuestionOptions = question.options?.map((_, i) => {
          return "survey." + index + ".options." + i
        })

        const validateSurveyQuestion = ["survey." + index + ".question", "survey." + index + ".options"]

        const validateThirdPage = [...(validateSurveyQuestionOptions ?? []), ...validateSurveyQuestion]

        return [...validateThirdPage];
      }

      return [];
    }) as FieldPath<TForm>[]
    isValid = await trigger(validateThirdPage, { shouldFocus: true });
    return isValid;
  }
  return isValid;
};