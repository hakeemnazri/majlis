import { EventQuestion, TInputTickets, TValidatePageFields } from "../types";
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
    options: ["PREMIUM", "GENERAL", "INFAQ", "PREVIEW"],
    className: "",
  },
  {
    label: "host",
    title: "Event Host",
    placeholder: "Select host",
    type: "select",
    options: ["PKAM", "TURATH"],
    className: "",
  },
];

export const EVENT_FORM_SECOND_PAGE_DEFAULT_VALUES = [
  {
    id: crypto.randomUUID(),
    name: undefined,
    description: undefined,
    price: undefined,
    quantity: undefined,
  },
];

export const EVENT_FORM_THIRD_PAGE_DEFAULT_VALUES: z.infer<
  typeof strictSurveyQuestionSchema
>[] = [
  {
    id: crypto.randomUUID(),
    type: "SHORT_ANSWER",
    question: "Nama",
    options: [""],
  },
  {
    id: crypto.randomUUID(),
    type: "SHORT_ANSWER",
    question: "Emel",
    options: [""],
  },
  {
    id: crypto.randomUUID(),
    type: "SHORT_ANSWER",
    question: "No. Telefon",
    options: [""],
  },
  {
    id: crypto.randomUUID(),
    type: "SHORT_ANSWER",
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
    label: "mainImage",
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

export const VALIDATE_FIRST_PAGE: TValidatePageFields = ["category", "host"];

export const VALIDATE_SECOND_PAGE: TValidatePageFields = [
  "description",
  "targetDonation",
  "reference",
  "title",
  "mainImage",
  "frequency",
  "tickets",
];
export const VALIDATE_THIRD_PAGE: TValidatePageFields = ["survey"];

export const INPUT_TICKETS: TInputTickets[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Input ticket name here...",
    className: "",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Input ticket price here...",
    className: "",
  },
  {
    name: "quantity",
    label: "Quantity",
    placeholder: "Input ticket quantity here...",
    className: "",
  },
  {
    name: "description",
    label: "Short Description",
    placeholder: "Input ticket description here...",
    className: "",
  },
];

export const QUESTION_TYPES = [
  "SHORT_ANSWER",
  "PARAGRAPH",
  "MULTIPLE_CHOICE",
  "CHECKBOXES",
];
