import { createContext } from "react";

type EventSurveyFormContextProviderProps = {
  children: React.ReactNode;
};

type TEventSurveyFormContext = {
  meow: string;
};

export const EventSurveyFormContext =
  createContext<TEventSurveyFormContext | null>(null);

function EventSurveyFormContextProvider({
  children,
}: EventSurveyFormContextProviderProps) {
  const meow = "";

  return (
    <EventSurveyFormContext.Provider
      value={{
        meow,
      }}
    >
      {children}
    </EventSurveyFormContext.Provider>
  );
}

export default EventSurveyFormContextProvider;
