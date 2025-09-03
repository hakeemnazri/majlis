import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollText } from "lucide-react";
import React from "react";

type DrawerContentEventDescriptionProps = {
  description: string;
};

function DrawerContentEventDescription({
  description,
}: DrawerContentEventDescriptionProps) {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ScrollText className="h-6 w-6 text-blue-600" />
          Description
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-4">
        <div className="prose prose-sm max-w-none">
          {description.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default DrawerContentEventDescription;
