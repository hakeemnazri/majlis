import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import React from "react";

function NoEventsCard() {
  return (
    <Card className="flex-grow flex flex-col justify-center items-center">
      <CardContent className="text-center py-12">
        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No events found</h3>
        <p className="text-muted-foreground">
          No events were found for given time period
        </p>
      </CardContent>
    </Card>
  );
}

export default NoEventsCard;
