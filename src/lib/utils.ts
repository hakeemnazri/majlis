import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createId } from "@paralleldrive/cuid2";
import {
  VALIDATE_FIRST_PAGE,
  VALIDATE_SECOND_PAGE,
} from "./constants/admin.constant";
import {
  TCategory,
  TForm,
  TSurveyQuestion,
  TValidatePageFields,
} from "./types";
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

  if (category === "INFAQ") {
    const exclude: TValidatePageFields = ["frequency", "tickets"];
    secondPageFieldsValidation = secondPageFieldsValidation.filter(
      (field) => !exclude.includes(field)
    );
  }
  if (category !== "INFAQ" && category !== "PREMIUM") {
    const exclude: TValidatePageFields = ["targetDonation", "tickets"];
    secondPageFieldsValidation = secondPageFieldsValidation.filter(
      (field) => !exclude.includes(field)
    );
  }

  if (category === "PREMIUM") {
    secondPageFieldsValidation = secondPageFieldsValidation.filter(
      (field) => field !== "targetDonation"
    );
  }

  return secondPageFieldsValidation;
};

export const thirdPageFieldsValidation = (survey: TSurveyQuestion[]) => {
  const thirdPageFieldsValidation = survey.flatMap((question, index) => {
    if (question.type === "SHORT_ANSWER" || question.type === "PARAGRAPH") {
      return ["survey." + index + ".question", "survey." + index + ".type", "survey." + index + ".isRequired"];
    }

    if (question.type === "MULTIPLE_CHOICE" || question.type === "CHECKBOXES") {
      const validateSurveyQuestionOptions = question.options?.map((_, i) => {
        return "survey." + index + ".options." + i;
      });

      const validateSurveyQuestion = [
        "survey." + index + ".question",
        "survey." + index + ".options",
        "survey." + index + ".isRequired",
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

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
