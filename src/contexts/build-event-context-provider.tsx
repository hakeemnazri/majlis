"use client";

import {
  EVENT_FORM_SECOND_PAGE_DEFAULT_VALUES,
  EVENT_FORM_THIRD_PAGE_DEFAULT_VALUES,
} from "@/lib/constants/admin.constant";
import { formSchema2 } from "@/lib/schemas";
import { TForm } from "@/lib/types";
import {
  firstPageFieldsValidation,
  secondPageFieldsValidation,
  thirdPageFieldsValidation,
} from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext } from "react";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn,
} from "react-hook-form";

type BuildEventContextProviderProps = {
  children: React.ReactNode;
};

type TBuildEventContext = {
  form: UseFormReturn<TForm>;
  registerTickets: UseFieldArrayReturn<TForm>;
  survey: UseFieldArrayReturn<TForm>;
  validatePageFields: (action: string) => Promise<boolean>;
};

export const BuildEventContext = createContext<TBuildEventContext | null>(null);

export const BuildEventContextProvider = ({
  children,
}: BuildEventContextProviderProps) => {
  //React-hook-form
  const isStrict = true;
  const form = useForm<TForm>({
    //TForm
    resolver: zodResolver(formSchema2(isStrict)), //formSchema
    defaultValues: {
      registerTickets: EVENT_FORM_SECOND_PAGE_DEFAULT_VALUES,
      survey: EVENT_FORM_THIRD_PAGE_DEFAULT_VALUES,
    },
  });
  const registerTickets = useFieldArray({
    control: form.control,
    name: "registerTickets",
  });
  const survey = useFieldArray({
    control: form.control,
    name: "survey",
  });

  const validatePageFields = async (action: string) => {
    const { trigger, watch } = form;
    const categoryFormField = watch("category");
    const surveyFormField = watch("survey");
    let isValid = false;
    const validateFirstPageFields = firstPageFieldsValidation();
    const validateSecondPageFields =
      secondPageFieldsValidation(categoryFormField);
    const validateThirdPageFields = thirdPageFieldsValidation(surveyFormField);

    if (action === "firstPage") {
      isValid = await trigger(validateFirstPageFields, { shouldFocus: true });
      return isValid;
    }

    if (action === "secondPage") {
      const toValidate = [
        ...validateSecondPageFields,
        ...validateFirstPageFields,
      ];
      isValid = await trigger(toValidate, { shouldFocus: true });
      return isValid;
    }

    if (action === "thirdPage") {
      const tovalidate = [
        ...validateThirdPageFields,
        ...validateSecondPageFields,
        ...validateFirstPageFields,
      ];
      isValid = await trigger(tovalidate, { shouldFocus: true });
      return isValid;
    }
    return isValid;
  };

  return (
    <BuildEventContext.Provider
      value={{ form, registerTickets, survey, validatePageFields }}
    >
      {children}
    </BuildEventContext.Provider>
  );
};
