import { EventWithinTimeSelect } from "@/actions/adminDatabase.action";
import { create } from "zustand";


type Store = {
    searchEvents: EventWithinTimeSelect[] | null;
    setSearchEvents: (events: EventWithinTimeSelect[] | null) => void
}

export const useDatabaseStore = create<Store>((set) => ({
    searchEvents: null,
    setSearchEvents: (events: EventWithinTimeSelect[] | null) => set({ searchEvents: events }),
}))