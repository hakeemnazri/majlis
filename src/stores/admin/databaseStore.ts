import { EventWithinTimeSelect } from "@/actions/adminDatabase.action";
import { create } from "zustand";


type Store = {
    searchEvents: EventWithinTimeSelect[];
    setSearchEvents: (events: EventWithinTimeSelect[]) => void
}

export const useDatabaseStore = create<Store>((set) => ({
    searchEvents: [],
    setSearchEvents: (events: EventWithinTimeSelect[]) => set({ searchEvents: events }),
}))