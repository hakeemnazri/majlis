import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createId } from "@paralleldrive/cuid2";
import { VALIDATE_FIRST_PAGE, VALIDATE_SECOND_PAGE } from "./constants/admin.constant";
import { TCategory, TForm, TSurveyQuestion, TValidatePageFields } from "./types";
import { FieldPath } from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCUID() {
  return createId();
}

export const firstPageFieldsValidation = () => {
  return VALIDATE_FIRST_PAGE;
};
export const secondPageFieldsValidation = (category: TCategory) => {
  let secondPageFieldsValidation: TValidatePageFields = VALIDATE_SECOND_PAGE;

  if (category === "infaq") {
    const exclude: TValidatePageFields = ["frequency", "registerTickets"];
    secondPageFieldsValidation = secondPageFieldsValidation.filter(
      (field) => !exclude.includes(field)
    );
  }
  if (category !== "infaq" && category !== "premium") {
    const exclude: TValidatePageFields = ["donationTarget", "registerTickets"];
    secondPageFieldsValidation = secondPageFieldsValidation.filter(
      (field) => !exclude.includes(field)
    );
  }

  if (category === "premium") {
    secondPageFieldsValidation = secondPageFieldsValidation.filter(
      (field) => field !== "donationTarget"
    );
  }

  return secondPageFieldsValidation;
};

export const thirdPageFieldsValidation = (survey: TSurveyQuestion[]) => {
  const thirdPageFieldsValidation = survey.flatMap((question, index) => {
    if (question.type === "short answer" || question.type === "paragraph") {
      return ["survey." + index + ".question", "survey." + index + ".type"];
    }

    if (question.type === "mutliple choice" || question.type === "checkboxes") {
      const validateSurveyQuestionOptions = question.options?.map((_, i) => {
        return "survey." + index + ".options." + i;
      });

      const validateSurveyQuestion = [
        "survey." + index + ".question",
        "survey." + index + ".options",
      ];

      const validateThirdPage = [
        ...(validateSurveyQuestionOptions ?? []),
        ...validateSurveyQuestion,
      ];

      return [...validateThirdPage];
    }

    return [];
  }) as FieldPath<TForm>[];
  return thirdPageFieldsValidation;
};
