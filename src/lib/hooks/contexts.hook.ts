
import { BuildEventContext } from "@/contexts/build-event-context-provider";
import { EventSurveyFormContext } from "@/contexts/event-survey-form-context-provider";
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

export const useEventSurveyFormContext = () => {
  const context = useContext(EventSurveyFormContext);

  if (!context) {
    throw new Error(
      "useEventSurveyFormContext must be used within a EventSurveyFormContextProvider"
    );
  }

  return context;
};


