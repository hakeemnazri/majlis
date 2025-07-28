import React from "react";
import EventDetails from "./event-details";
import TicketDetails from "./ticket-details";
import { useBuildEventContext } from "@/lib/hooks/buildEvent.hook";

function FormSecondPage() {
  const {
    form: { watch },
  } = useBuildEventContext();

  const category = watch("category");
  return (
    <>
      {/* TODO: check if each tikcet has an id field */}
      <EventDetails />
      {category === "PREMIUM" && <TicketDetails />}
    </>
  );
}

export default FormSecondPage;
