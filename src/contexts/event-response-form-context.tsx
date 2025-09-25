"use client";

import { strictSurveyQuestionInputSchema } from "@/lib/schemas";
import { TEventResponseForm } from "@/lib/types";
import { useEventResponseFormStore } from "@/stores/event/eventResponseFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type EventResponseFormContextProviderProps = {
  children: React.ReactNode;
};

type TEventResponseFormContext = {
  form: UseFormReturn<TEventResponseForm>;
};

export const EventResponseFormContext =
  createContext<TEventResponseFormContext | null>(null);

function EventResponseFormContextProvider({
  children,
}: EventResponseFormContextProviderProps) {
  const { event } = useEventResponseFormStore((state) => state);

  const form = useForm<TEventResponseForm>({
    resolver: zodResolver(strictSurveyQuestionInputSchema(true)),
    defaultValues: {
      eventId: undefined,
      responses: [],
    },
  });

  useEffect(() => {
    if (event) {
      form.reset({
        eventId: event?.id,
        responses: event?.survey.map((question) => ({
          id: question.id,
          answer: {
            input: "",
            checkbox: [],
          },
        })),
      });
    }
  }, [event, form]);

  return (
    <EventResponseFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </EventResponseFormContext.Provider>
  );
}

export default EventResponseFormContextProvider;


