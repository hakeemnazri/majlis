import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TEventPayload } from "@/lib/types";
import { FileText, Tags, TicketCheck } from "lucide-react";
import React from "react";

type DrawerContentEventTicketsProps = {
  tickets: TEventPayload["tickets"];
};

function DrawerContentEventTickets({
  tickets,
}: DrawerContentEventTicketsProps) {
  if (tickets.length === 0) return null;
  const formatPrice = (price: number) => {
    return `RM ${price.toFixed(2)}`;
  };
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-4">
          <Tags className="h-8 w-8 text-blue-600" />
          <div className="flex flex-col">
            <span>Tickets</span>
            <span className="text-sm text-gray-600">
              {tickets.length} ticket type{tickets.length !== 1 ? "s" : ""}{" "}
              configured
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-4">
        <section className="divide-y-2 space-y-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="space-y-4 w-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {ticket.name}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {ticket.price && formatPrice(ticket.price)}
                  </div>
                </div>
              </div>

              {/* Description */}
              {ticket.description && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Description
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    {ticket.description}
                  </p>
                </div>
              )}

              {/* Quantity Available */}
              <div className="bg-white rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <TicketCheck className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Available Quantity
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">
                    {ticket.quantity}
                  </div>
                  <div className="text-xs text-gray-500">tickets remaining</div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
}

export default DrawerContentEventTickets;
