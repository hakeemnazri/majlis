import { EVENT_FORM_SECOND_PAGE_DEFAULT_VALUES, EVENT_FORM_THIRD_PAGE_DEFAULT_VALUES } from "@/lib/constants/admin.constant";
import { EventWithRelations, TForm } from "@/lib/types";
import { UseFormReturn } from "react-hook-form";
import { create } from "zustand";

type Store = {
  formPage: number;
  isDialogOpen: boolean;
  nextFormPage: () => void;
  prevFormPage: () => void;
  resetFormPage: () => void;
  setIsDialogOpen: (open: boolean) => void;
  handleEditEvent: (
    form: UseFormReturn<TForm>,
    formData: EventWithRelations
  ) => void;
  handleOnDialogClose: (form: UseFormReturn<TForm>) => void;
};

export const useBuildFormStore = create<Store>((set) => ({
  formPage: 0,
  isDialogOpen: false,
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
  resetFormPage: () => {
    set(() => ({ formPage: 0 }));
  },
  setIsDialogOpen: (open: boolean) => {
    set((state) => ({
      ...state,
      isDialogOpen: open,
    }));
  },
  handleEditEvent: (
    form: UseFormReturn<TForm>,
    formData: EventWithRelations
  ) => {
    form.reset(formData);
    set((state) => ({
      ...state,
      isDialogOpen: true,
    }));
  },
  handleOnDialogClose: (form: UseFormReturn<TForm>) => {
    form.reset({
      tickets: EVENT_FORM_SECOND_PAGE_DEFAULT_VALUES,
      survey: EVENT_FORM_THIRD_PAGE_DEFAULT_VALUES,
    });
    set(() => ({
      formPage: 0,
      isDialogOpen: false,
    }));
  },
}));
