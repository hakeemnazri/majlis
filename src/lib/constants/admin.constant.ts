import { EventQuestion, TValidatePageFields } from "../types";

export const EVENT_FIRST_PAGE_FORM_QUESTIONS: EventQuestion[] = [
  {
    label: "category",
    title: "Category",
    placeholder: "Select category",
    type: "select",
    options: ["premium", "general", "infaq", "preview"],
  },
  {
    label: "eventHost",
    title: "Event Host",
    placeholder: "Select host",
    type: "select",
    options: ["pkam", "turath"],
  },
];

export const EVENT_SECOND_PAGE_FORM_QUESTIONS: EventQuestion[] = [
  {
    label: "title",
    title: "Event Title",
    placeholder: "Input title here...",
    type: "text",
  },
  {
    label: "description",
    title: "Description",
    placeholder: "Input description here...",
    type: "textarea",
  },
  {
    label: "eventImage",
    title: "Event Image",
    placeholder: "Upload image",
    type: "image",
  },
  {
    label: "frequency",
    title: "Frequency",
    placeholder: "Select frequency",
    type: "select",
    options: ["frequency1", "frequency2", "frequency3"],
  },
  {
    label: "donationTarget",
    title: "Target Donation(RM)",
    placeholder: "Input donation target here...",
    type: "text",
  },
  {
    label: "reference",
    title: "Bank Reference",
    placeholder: "Input bank reference here...",
    type: "text",
  },
];

export const validateFirstPage: TValidatePageFields = ["category", "eventHost"];
export const validateSecondPage: TValidatePageFields = [
  "description",
  "donationTarget",
  "reference",
  "title",
  "eventImage",
  "frequency",
];
