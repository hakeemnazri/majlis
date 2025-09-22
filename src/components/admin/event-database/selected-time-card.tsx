"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDatabaseStore } from "@/stores/admin/databaseStore";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import NoEventsCard from "./no-events-card";
import SelectEventCard from "./select-event-card";

function SelectedTimeCard() {
  const { searchEvents } = useDatabaseStore((state) => state);

  return (
    <>
      {searchEvents !== null && searchEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Step 2: Select Event
            </CardTitle>
            <p className="text-sm text-gray-600">
              Found 10 events before january 2025
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4">
              {searchEvents.map((event) => (
                <Link
                  href={`/app/admin/database/${event.slug}`}
                  key={event.id}
                >
                  <div                   className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {event.host.charAt(0).toUpperCase() +
                            event.host.slice(1).toLowerCase()}{" "}
                          •{" "}
                          {new Date(event.createdAt).toLocaleDateString(
                            "en-MY",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <Badge>{event.category}</Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {searchEvents !== null && searchEvents.length === 0 && (
        <NoEventsCard/>
      )}

      {searchEvents === null && (
        <SelectEventCard/>
      )}
    </>
  );
}

export default SelectedTimeCard;
