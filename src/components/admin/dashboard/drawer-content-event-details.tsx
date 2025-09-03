import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarRange, Clock, FileText } from "lucide-react";
import React from "react";
import { Event } from "../../../../generated/prisma";

type DrawerContentEventDetailsProps = {
  details: Event;
};

function DrawerContentEventDetails({
  details,
}: DrawerContentEventDetailsProps) {
  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-600" />
          Event Details
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-4">
        <div className="flex justify-center gap-2 md:gap-6 text-sm h-12">
          <div className="flex items-center gap-3">
            <CalendarRange className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">Created</div>
              <div className="text-muted-foreground">
                {formatDate(details.createdAt)}
              </div>
            </div>
          </div>

          <Separator orientation="vertical" />

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">Frequency</div>
              <div className="text-muted-foreground">{details.frequency}</div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="text-sm">
          <span className="font-medium">Reference ID:</span>
          <span className="ml-2 font-mono text-muted-foreground text-xs bg-muted px-2 py-1 rounded">
            {details.reference}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default DrawerContentEventDetails;
