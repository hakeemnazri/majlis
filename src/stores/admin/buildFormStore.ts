"use client";

import { create } from "zustand";

type Store = {
  formPage: number;
  isDialogOpen: boolean;
  formAction: "create" | "edit";
  handleNextFormPage: () => void;
  handlePrevFormPage: () => void;
  handleResetFormPage: () => void;
  handleCreateEvent: () => void;
  handleEditEvent: () => void;
  handleOnDialogClose: () => void;
};

export const useBuildFormStore = create<Store>((set) => ({
  formPage: 0,
  isDialogOpen: false,
  formAction: "create",
  handleNextFormPage: () => {
    set((state) => ({
      formPage: state.formPage + 1,
    }));
  },
  handlePrevFormPage: () => {
    set((state) => {
      if (state.formPage === 0) {
        return state;
      }

      return { ...state, formPage: state.formPage - 1 };
    });
  },
  handleResetFormPage: () => {
    set(() => ({ formPage: 0 }));
  },
  handleCreateEvent: () => {
    set((state) => ({
      ...state,
      isDialogOpen: true,
      formAction: "create",
    }));
  },
  handleEditEvent: () => {
    set((state) => ({
      ...state,
      isDialogOpen: true,
      formAction: "edit",
    }));
  },
  handleOnDialogClose: () => {
    set(() => ({
      formPage: 0,
      isDialogOpen: false,
    }));
  },
}));
