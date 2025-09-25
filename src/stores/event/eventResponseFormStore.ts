"use client";

import { TEventResponseForm } from "@/lib/types";
import { FieldPath } from "react-hook-form";
import { create } from "zustand";
import { Event, Survey } from "../../../generated/prisma";

type TEvent = Pick<Event, "id"> & {
  survey: Survey[];
};

type Store = {
  event: TEvent | null;
  formProps: () => FieldPath<TEventResponseForm>[];
  setEvent: (event: TEvent) => void;
};

export const useEventResponseFormStore = create<Store>((set, get) => ({
  event: null,
  formProps: () => {
    const event = get().event;
    return [
      ...(event?.survey ?? []).map((question, index) => {
        if (question.type === "CHECKBOXES") {
          return "responses." + index + ".answer.checkbox";
        } else {
          return "responses." + index + ".answer.input";
        }
      }),
    ] as FieldPath<TEventResponseForm>[];
  },
  setEvent: (event: TEvent) => set({ event }),
}));
