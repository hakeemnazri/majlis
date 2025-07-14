"use client";

import { formSchema2 } from "@/lib/schemas";
import { TForm } from "@/lib/types";
import { generateCUID } from "@/lib/utils";
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
      donationTarget: 0,
      registerTickets: [
        {
          ticketName: "",
          ticketDescription: "",
          ticketPrice: 0,
          ticketQuantity: 0,
        },
      ],
      survey:[
        {
          id: generateCUID(),
          type: "short answer",
          question: "Nama",
          options: [""]
        },
        {
          id: generateCUID(),
          type: "short answer",
          question: "Emel",
          options: [""]
        },
        {
          id: generateCUID(),
          type: "short answer",
          question: "No. Telefon",
          options: [""]
        },
        {
          id: generateCUID(),
          type: "short answer",
          question: "Tempat tinggatl (Cth: Kota Damansara)",
          options: [""]
        },
      ]
    },
  });
  const registerTickets =  useFieldArray({
    control: form.control,
    name: "registerTickets",
  });
  const survey = useFieldArray({
    control: form.control,
    name: "survey",
  })
  return (
    <BuildEventContext.Provider value={{ form, registerTickets, survey }}>
      {children}
    </BuildEventContext.Provider>
  );
};
