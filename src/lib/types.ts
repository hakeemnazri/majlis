import z from "zod";
import { formSchema, ticketSchema } from "./schemas";

export type TRegisterTicket = keyof z.infer<typeof ticketSchema>;

export type TForm = z.infer<typeof formSchema>;

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
  name: TRegisterTicket;
  label: string;
  placeholder: string;
  className: string;
};
