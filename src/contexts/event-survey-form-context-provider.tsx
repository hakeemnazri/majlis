"use client";

import { strictSurveyQuestionInputSchema } from "@/lib/schemas";
import { TEventSurveyForm } from "@/lib/types";
import { useEventSurveyFormStore } from "@/stores/event/eventSurveyFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type EventSurveyFormContextProviderProps = {
  children: React.ReactNode;
};

type TEventSurveyFormContext = {
  form: UseFormReturn<TEventSurveyForm>;
};

export const EventSurveyFormContext =
  createContext<TEventSurveyFormContext | null>(null);

function EventSurveyFormContextProvider({
  children,
}: EventSurveyFormContextProviderProps) {
  const { event } = useEventSurveyFormStore((state) => state);

  const form = useForm<TEventSurveyForm>({
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
    <EventSurveyFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </EventSurveyFormContext.Provider>
  );
}

export default EventSurveyFormContextProvider;
