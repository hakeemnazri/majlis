import { EventWithinTimeSelect } from "@/actions/adminDatabase.action";
import { create } from "zustand";

type Store = {
  id: string | null;
  isDialogOpen: boolean;
  formAction: "add-validation-column" | "remove-validation-column" | "add-response" | "edit-checkbox" | "";
  searchEvents: EventWithinTimeSelect[] | null;
  setSearchEvents: (events: EventWithinTimeSelect[] | null) => void;
  setAddValidationColumn: () => void;
  setRemoveValidationColumn: () => void;
  setAddResponse: () => void;
  setDialogClose: () => void;
  setId: (id: string) => void;
};

export const useDatabaseStore = create<Store>((set) => ({
  id: null,
  searchEvents: null,
  isDialogOpen: false,
  formAction: "",
  setSearchEvents: (events: EventWithinTimeSelect[] | null) =>
    set({ searchEvents: events }),
  setAddValidationColumn: () => {
    set((state) => ({
      ...state,
      isDialogOpen: true,
      formAction: "add-validation-column",
    }));
  },
  setRemoveValidationColumn: () => {
    set((state) => ({
      ...state,
      isDialogOpen: true,
      formAction: "remove-validation-column",
    }));
  },
  setAddResponse: () => {
    set((state) => ({
      ...state,
      isDialogOpen: true,
      formAction: "add-response",
    }));
  },
  setDialogClose: () =>
    set((state) => ({
      ...state,
      isDialogOpen: false,
    })),
  setId: (id: string) =>
    set((state) => ({
      ...state,
      isDialogOpen: true,
      formAction: "edit-checkbox",
      id,
    })),
}));
