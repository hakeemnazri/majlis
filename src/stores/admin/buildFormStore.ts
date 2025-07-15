import { create } from "zustand";

type Store = {
  formPage: number;
  nextFormPage: () => void;
  prevFormPage: () => void;
};

export const useBuildFormStore = create<Store>((set) => ({
  formPage: 0,
  nextFormPage: () => {
    set((state) => ({
      formPage: state.formPage + 1,
    }));
  },
  prevFormPage: () => {
    set((state) => {
      if (state.formPage === 0) {
        return state;
      }

      return { ...state, formPage: state.formPage - 1 };
    });
  },
}));
