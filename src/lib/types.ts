import z from "zod";
import {
  formSchema2,
  strictTicketSchema,
  strictSurveyQuestionSchema,
} from "./schemas";

export type TRegisterTicketName = keyof z.infer<typeof strictTicketSchema>;

export type TSurveyName = keyof z.infer<typeof strictSurveyQuestionSchema>;

export type TSurveyQuestion = z.infer<ReturnType<typeof formSchema2>>["survey"][0];

export type TCategory = z.infer<ReturnType<typeof formSchema2>>["category"];

export type TForm = z.infer<ReturnType<typeof formSchema2>>; //formSchema

export type TValidatePageFields = (keyof TForm)[];

export type EventQuestion = {
  label: keyof TForm;
  title: string;
  placeholder: string;
  type: "text" | "textarea" | "select" | "image";
  options?: string[];
  className: string;
};

export type TInputTickets = {
  name: TRegisterTicketName;
  label: string;
  placeholder: string;
  className: string;
};
