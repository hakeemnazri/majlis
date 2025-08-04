import { create } from "zustand";

type Store = {
  meow: string;
  setMeow: (meow: string) => void;
};

export const useEventSurveyFormStore = create<Store>((set) => ({
  meow: "",
  setMeow: (meow: string) => set({ meow }),
}));
