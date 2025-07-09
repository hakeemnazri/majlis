import { EventQuestion, TInputTickets, TValidatePageFields } from "../types";

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
    label: "donationTarget",
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

export const VALIDATE_FIRST_PAGE: TValidatePageFields = ["category", "eventHost"];

export const VALIDATE_SECOND_PAGE: TValidatePageFields = [
  "description",
  "donationTarget",
  "reference",
  "title",
  "eventImage",
  "frequency",
  "registerTickets",
];

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
