"use client";

import { formSchema } from "@/lib/schemas";
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
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registerTickets: [
        {
          ticketName: null,
          ticketDescription: null,
          ticketPrice: null,
          ticketQuantity: null,
        },
      ],
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
