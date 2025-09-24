import { EventWithinTimeSelect } from "@/actions/adminDatabase.action";
import { create } from "zustand";

type formActionEnums =
  | "add-validation-column"
  | "remove-validation-column"
  | "add-response"
  | "edit-checkbox"
  | "edit-input"
  | "";

type Store = {
  id: string | null;
  eventId: string | null;
  slug: string | null;
  isDialogOpen: boolean;
  formAction: formActionEnums;
  isPaginationLoading: boolean;
  currentPage: number;
  payload: string | null;
  setCurrentPage: (page: number) => void;
  setIsPaginatoinLoading: (isPaginationLoading: boolean) => void;
  searchEvents: EventWithinTimeSelect[] | null;
  setSearchEvents: (events: EventWithinTimeSelect[] | null) => void;
  setAddValidationColumn: () => void;
  setRemoveValidationColumn: () => void;
  setAddResponse: () => void;
  setDialogClose: () => void;
  setId: (
    id: string | null,
    formAction: formActionEnums,
    isDialogOpen: boolean,
    payload?: string
  ) => void;
  setSlug: (slug: string | null) => void;
  setEventId: (eventId: string | null) => void;
};

export const useDatabaseStore = create<Store>((set) => ({
  id: null,
  eventId: null,
  slug: null,
  searchEvents: null,
  isDialogOpen: false,
  formAction: "",
  payload: null,
  isPaginationLoading: false,
  currentPage: 1,
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
  setId: (id, formAction, isDialogOpen, payload) =>
    set((state) => ({
      ...state,
      isDialogOpen,
      formAction,
      payload,
      id
    })),
  setSlug: (slug: string | null) => set((state) => ({ ...state, slug })),
  setCurrentPage: (page: number) =>
    set((state) => ({
      ...state,
      currentPage: page,
    })),
  setIsPaginatoinLoading: (isPaginationLoading: boolean) =>
    set((state) => ({
      ...state,
      isPaginationLoading,
    })),
  setEventId: (eventId: string | null) =>
    set((state) => ({ ...state, eventId })),
}));

// isPaginationLoading: boolean;
// setIsPaginatoinLoading: React.Dispatch<React.SetStateAction<boolean>>;
// currentPage: number;
