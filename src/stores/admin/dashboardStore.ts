import { TEventPayload } from "@/lib/types";
import { create } from "zustand";

type SetPaginationData = {
  data: TEventPayload[];
  totalCount: number;
  totalPages: number;
  isFinalPage: boolean;
}

type Store = {
  data: TEventPayload[];
  paginationTotalCount: number;
  paginationTotalPages: number;
  paginationIsFinalPage: boolean;
  setPagination: (data: SetPaginationData) => void;
};

export const useDashboardStore = create<Store>((set) => ({
  data: [],
  paginationTotalCount: 0,
  paginationTotalPages: 0,
  paginationIsFinalPage: false,
  setPagination: (data: SetPaginationData) => {
    set({
      data: data.data,
      paginationTotalCount: data.totalCount,
      paginationTotalPages: data.totalPages,
      paginationIsFinalPage: data.isFinalPage,
    });
  }
}));
