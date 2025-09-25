"use client";

import { submitEventSurveyForm } from "@/actions/eventFormSubmit.admin";
import { strictSurveyQuestionInputSchema } from "@/lib/schemas";
import { TEventResponseForm } from "@/lib/types";
import { useEventResponseFormStore } from "@/stores/event/eventResponseFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

type EventResponseFormContextProviderProps = {
  children: React.ReactNode;
};

type TEventResponseFormContext = {
  eventResponseForm: UseFormReturn<TEventResponseForm>;
  handleOnSubmitEventResponse: () => Promise<void>;
};

export const EventResponseFormContext =
  createContext<TEventResponseFormContext | null>(null);

function EventResponseFormContextProvider({
  children,
}: EventResponseFormContextProviderProps) {
  const { survey, event, formProps } = useEventResponseFormStore((state) => state);

  const eventResponseForm = useForm<TEventResponseForm>({
    resolver: zodResolver(strictSurveyQuestionInputSchema(true)),
    defaultValues: {
      eventId: undefined,
      responses: [],
    },
  });

  useEffect(() => {
    if (event && survey) {
      eventResponseForm.reset({
        eventId: event.id,
        responses: survey.map((question) => ({
          id: question.id,
          answer: {
            input: "",
            checkbox: [],
          },
        })),
      });
    }
  }, [event, eventResponseForm, survey]);

  async function handleOnSubmitEventResponse() {
    const values = eventResponseForm.getValues();
    const validateForm = await eventResponseForm.trigger(formProps());
    if (!validateForm) return;

    toast.promise(submitEventSurveyForm(values), {
      loading: "Submitting response...",
      success: (data) => {
        if ("error" in data) {
          throw new Error(data.error);
        }
        if (!data.success) {
          throw new Error(data.message);
        }
        if (data.success) {
          eventResponseForm.reset();
          return data.message;
        }
        return "Response submitted successfully!";
      },
      error: (error) => {
        return error.message || "Failed to submit response";
      },
    });
  }

  return (
    <EventResponseFormContext.Provider
      value={{
        eventResponseForm,
        handleOnSubmitEventResponse
      }}
    >
      {children}
    </EventResponseFormContext.Provider>
  );
}

export default EventResponseFormContextProvider;


