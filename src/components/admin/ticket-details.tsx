import React from "react";
import { CardHeader, CardTitle, CardDescription } from "../ui/card";
import { UseFieldArrayAppend } from "react-hook-form";
import { TForm } from "@/lib/types";
import { Button } from "../ui/button";
import { useBuildEventContext } from "@/lib/hooks/build-event-hooks";
import TicketForm from "./ticket-form";

function TicketDetails() {
  const { registerTickets: {fields, append} } = useBuildEventContext();

  return (
    <>
      <TicketHeader append={append} />

      {fields.map((field, index) => (
        <TicketForm key={field.id} index={index} />
      ))}
    </>
  );
}

export default TicketDetails;

const TicketHeader = ({ append }: { append: UseFieldArrayAppend<TForm> }) => {
  //handler
  const handleAddTicketForm = () => {
    append({
      ticketName: "",
      ticketDescription: "",
      ticketPrice: 0,
      ticketQuantity: 0,
    });
  };
  return (
    <div className="flex w-full justify-between">
      <TicketFormHeader />

      <Button type="button" onClick={handleAddTicketForm}>
        add
      </Button>
    </div>
  );
};

const TicketFormHeader = () => {
  return (
    <CardHeader className="px-0 w-full">
      <CardTitle>Tickets</CardTitle>
      <CardDescription>Please specify the ticket details.</CardDescription>
    </CardHeader>
  );
};
