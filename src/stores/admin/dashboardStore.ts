import { create } from "zustand";

type Store = {
  isDrawerOpen: boolean;
  isAlertOpen: boolean;
  setIsDrawerOpen: (status: boolean) => void;
  setIsAlertOpen: (status: boolean) => void;
};

export const useDashboardStore = create<Store>((set) => ({
  isDrawerOpen: false,
  isAlertOpen: false,
  setIsDrawerOpen: (status: boolean) => set({ isDrawerOpen: status }),
  setIsAlertOpen: (status: boolean) => set({ isAlertOpen: status }),
}));
