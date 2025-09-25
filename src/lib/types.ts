import z from "zod";
import {
  formSchema2,
  strictTicketSchema,
  strictSurveyQuestionSchema,
  surveyQuestionsSchema,
  timeFormSchema,
  nameSchema,
  ResponseQuestionSchema,
} from "./schemas";
import { handleServerActionError } from "./error";
import { Event as EventModel, Prisma, Survey as SurveyModel, Tickets as TicketModel } from "../../generated/prisma";
import { UseFormReturn } from "react-hook-form";
import { EventData, EventResponse, EventSurvey } from "@/components/admin/event-database/slug/table-data";
import { ColumnDef, Table } from "@tanstack/react-table";
import { formActionEnums } from "@/stores/admin/databaseStore";

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

export type TEventPayload = Prisma.EventGetPayload<{ include:{
  survey: true;
  tickets: true
}}>

export type PaginatedEvents = {
  data: TEventPayload[];
  totalCount: number;
  totalPages: number;
  canGetPreviousPage: boolean;
  isFinalPage: boolean;
};


export type TTimeFormSchema = z.infer<typeof timeFormSchema>

export type TEventDatabaseTableContext = {
  eventDatabaseForm: UseFormReturn<z.infer<typeof nameSchema>>;
  handleOnSubmit: (action: formActionEnums) => void;
  handleCloseDialog: () => void;
  table: Table<EventResponse>;
  columns: ColumnDef<EventResponse>[];
  setData: React.Dispatch<React.SetStateAction<EventData>>;
  data: EventData;
  survey: EventSurvey
};

export type TNameSchema = z.infer<typeof nameSchema>

export type TEventResponseForm = z.infer<typeof ResponseQuestionSchema>

