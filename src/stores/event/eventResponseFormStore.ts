"use client";

import { TEventResponseForm } from "@/lib/types";
import { FieldPath } from "react-hook-form";
import { create } from "zustand";
import { Event, Survey } from "../../../generated/prisma";


type Store = {
  survey: Survey[] | null;
  event: Event | null;
  formProps: () => FieldPath<TEventResponseForm>[];
  setEvent: (event: Event) => void;
  setSurvey: (survey: Survey[]) => void;
};

export const useEventResponseFormStore = create<Store>((set, get) => ({
  survey: null,
  event: null,
  formProps: () => {
    const survey = get().survey;
    return [
      ...(survey ?? []).map((question, index) => {
        if (question.type === "CHECKBOXES") {
          return "responses." + index + ".answer.checkbox";
        } else {
          return "responses." + index + ".answer.input";
        }
      }),
    ] as FieldPath<TEventResponseForm>[];
  },
  setEvent: (event: Event) =>
    set((state) => ({
      ...state,
      event,
    })),
  setSurvey: (survey: Survey[]) =>
    set((state) => ({
      ...state,
      survey,
    })),
}));
