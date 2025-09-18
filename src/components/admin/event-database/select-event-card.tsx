import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import React from "react";

function SelectEventCard() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Search Event</h3>
        <p className="text-muted-foreground">
          Search for an event to get started
        </p>
      </CardContent>
    </Card>
  );
}

export default SelectEventCard;
