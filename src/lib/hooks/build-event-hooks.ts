import { BuildEventContext } from "@/contexts/build-event-context-provider";
import { useContext } from "react";

export const useBuildEventContext = () => {
  const context = useContext(BuildEventContext);

  if (!context) {
    throw new Error(
      "useBuildEventContext must be used within a BuildEventContextProvider"
    );
  }

  return context;
};
