import z from "zod";
import {
  formSchema2,
  strictTicketSchema,
  strictSurveyQuestionSchema,
  surveyQuestionsSchema,
} from "./schemas";
import { handleServerActionError } from "./error";
import { Event as EventModel, Survey as SurveyModel, Ticket as TicketModel } from "../../generated/prisma";

export type TRegistername = keyof z.infer<typeof strictTicketSchema>;

export type TSurveyName = keyof z.infer<typeof strictSurveyQuestionSchema>;

export type TSurveyQuestion = z.infer<
  ReturnType<typeof formSchema2>
>["survey"][0];

export type TCategory = z.infer<ReturnType<typeof formSchema2>>["category"];

export type TForm = z.infer<ReturnType<typeof formSchema2>>; //formSchema

export type TValidatePageFields = (keyof TForm)[];

export type ServerActionError = ReturnType<typeof handleServerActionError>;
export type EventQuestion = {
  label: keyof TForm;
  title: string;
  placeholder: string;
  type: "text" | "textarea" | "select" | "image";
  options?: string[];
  className: string;
};

export type TInputTickets = {
  name: TRegistername;
  label: string;
  placeholder: string;
  className: string;
};


export type EventWithRelations = EventModel & {
    survey: SurveyModel[];
    tickets: TicketModel[]
}
export type TGetAdminDashboardEvents = {
    success: true,
    message: string,
    data: EventWithRelations[]
}

export type TAction = "create" | "edit";

export type TEventSurveyForm = z.infer<typeof surveyQuestionsSchema>