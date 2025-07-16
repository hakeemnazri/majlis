import { EventQuestion, TInputTickets, TValidatePageFields } from "../types";
import { generateCUID } from "../utils";
import z from "zod";
import { strictSurveyQuestionSchema } from "../schemas";

export const BUILD_FORM_HEADERS = [
  {
    title: "Event Build form",
    description: "Select event type & host within this section",
  },
  {
    title: "Event Details",
    description: "Fill in all event details within this section.",
  },
  {
    title: "Survey Questions",
    description: "Customize survey questions within this section.",
  },
  {
    title: "Review & Submit",
    description: "Review and submit event within this section.",
  },
];

export const EVENT_FIRST_PAGE_FORM_QUESTIONS: EventQuestion[] = [
  {
    label: "category",
    title: "Category",
    placeholder: "Select category",
    type: "select",
    options: ["premium", "general", "infaq", "preview"],
    className: "",
  },
  {
    label: "eventHost",
    title: "Event Host",
    placeholder: "Select host",
    type: "select",
    options: ["pkam", "turath"],
    className: "",
  },
];

export const EVENT_FORM_SECOND_PAGE_DEFAULT_VALUES = [
  {
    ticketName: undefined,
    ticketDescription: undefined,
    ticketPrice: undefined,
    ticketQuantity: undefined,
  },
];

export const EVENT_FORM_THIRD_PAGE_DEFAULT_VALUES: z.infer<
  typeof strictSurveyQuestionSchema
>[] = [
  {
    id: generateCUID(),
    type: "short answer",
    question: "Nama",
    options: [""],
  },
  {
    id: generateCUID(),
    type: "short answer",
    question: "Emel",
    options: [""],
  },
  {
    id: generateCUID(),
    type: "short answer",
    question: "No. Telefon",
    options: [""],
  },
  {
    id: generateCUID(),
    type: "short answer",
    question: "Tempat tinggatl (Cth: Kota Damansara)",
    options: [""],
  },
];

export const EVENT_SECOND_PAGE_FORM_QUESTIONS: EventQuestion[] = [
  {
    label: "title",
    title: "Event Title",
    placeholder: "Input title here...",
    type: "text",
    className: "",
  },
  {
    label: "description",
    title: "Description",
    placeholder: "Input description here...",
    type: "textarea",
    className: "h-60",
  },
  {
    label: "eventImage",
    title: "Event Image",
    placeholder: "Upload image",
    type: "image",
    className: "",
  },
  {
    label: "frequency",
    title: "Frequency",
    placeholder: "Select frequency",
    type: "select",
    options: ["frequency1", "frequency2", "frequency3"],
    className: "",
  },
  {
    label: "targetDonation",
    title: "Target Donation(RM)",
    placeholder: "Input donation target here...",
    type: "text",
    className: "",
  },
  {
    label: "reference",
    title: "Bank Reference",
    placeholder: "Input bank reference here...",
    type: "text",
    className: "",
  },
];

export const VALIDATE_FIRST_PAGE: TValidatePageFields = [
  "category",
  "eventHost",
];

export const VALIDATE_SECOND_PAGE: TValidatePageFields = [
  "description",
  "targetDonation",
  "reference",
  "title",
  "eventImage",
  "frequency",
  "registerTickets",
];
export const VALIDATE_THIRD_PAGE: TValidatePageFields = ["survey"];

export const INPUT_TICKETS: TInputTickets[] = [
  {
    name: "ticketName",
    label: "Name",
    placeholder: "Input ticket name here...",
    className: "",
  },
  {
    name: "ticketPrice",
    label: "Price",
    placeholder: "Input ticket price here...",
    className: "",
  },
  {
    name: "ticketQuantity",
    label: "Quantity",
    placeholder: "Input ticket quantity here...",
    className: "",
  },
  {
    name: "ticketDescription",
    label: "Short Description",
    placeholder: "Input ticket description here...",
    className: "",
  },
];

export const QUESTION_TYPES = [
  "short answer",
  "paragraph",
  "mutliple choice",
  "checkboxes",
];
