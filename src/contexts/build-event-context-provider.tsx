"use client";

import { formSchema2 } from "@/lib/schemas";
import { TForm } from "@/lib/types";
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
  fieldArray: UseFieldArrayReturn<TForm>;
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
          type: "short answer",
          question: "Nama",
          options: null
        },
        {
          type: "short answer",
          question: "Emel",
          options: null
        },
        {
          type: "short answer",
          question: "Tempat tinggal (cth: Kota Damansara)",
          options: null
        },
      ]
    },
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "registerTickets",
  });
  return (
    <BuildEventContext.Provider value={{ form, fieldArray }}>
      {children}
    </BuildEventContext.Provider>
  );
};
