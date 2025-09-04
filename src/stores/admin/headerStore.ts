import { create } from "zustand";

type Store = {
    page: string;
    setPage: (page: string) => void
}

export const useHeaderStore = create<Store>((set) => ({
    page: "",
    setPage: (page: string) => set({ page }),
}))