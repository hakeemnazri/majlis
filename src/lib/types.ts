import z from "zod";
import { formSchema } from "./schemas";

export type TForm = z.infer<typeof formSchema>;

export type TValidatePageFields = (keyof TForm)[];

export type EventQuestion = {
    label: keyof TForm;
    title: string;
    placeholder: string;
    type: "text" | "textarea" | "select" | "image";
    options?: string[];
  };
