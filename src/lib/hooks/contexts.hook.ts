
import { BuildEventContext } from "@/contexts/build-event-context-provider";
import { DashboardTableContext } from "@/contexts/dashboard-table-context";
import { EventDatabaseTableContext } from "@/contexts/event-database-table-context";
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

export const useDashboardTableContext = () => {
  const context = useContext(DashboardTableContext);

  if (!context) {
    throw new Error(
      "useEventSurveyFormContext must be used within a EventSurveyFormContextProvider"
    );
  }

  return context;
};

export const useEventDatabaseTableContext = () => {
  const context = useContext(EventDatabaseTableContext);

  if (!context) {
    throw new Error(
      "useEventDatabaseTableContext must be used within a EventSurveyFormContextProvider"
    );
  }

  return context;
};


