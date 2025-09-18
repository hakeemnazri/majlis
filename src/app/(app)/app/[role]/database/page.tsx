import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Search } from "lucide-react";
import TimeForm from "@/components/admin/event-database/time-form";

function page() {
  const mockEvents = [
    {
      id: "1",
      name: "Tech Conference 2023",
      date: "2023-03-15",
      location: "San Francisco, CA",
      attendees: 1250,
      status: "completed",
      revenue: 125000,
      description:
        "Annual technology conference featuring the latest innovations in AI and machine learning.",
    },
    {
      id: "2",
      name: "Marketing Summit",
      date: "2023-05-22",
      location: "New York, NY",
      attendees: 800,
      status: "completed",
      revenue: 95000,
      description:
        "Premier marketing event bringing together industry leaders and innovative strategies.",
    },
    {
      id: "3",
      name: "Design Workshop",
      date: "2023-07-10",
      location: "Austin, TX",
      attendees: 300,
      status: "cancelled",
      revenue: 0,
      description:
        "Hands-on design workshop focusing on user experience and interface design principles.",
    },
    {
      id: "4",
      name: "Startup Pitch Day",
      date: "2023-09-18",
      location: "Seattle, WA",
      attendees: 500,
      status: "completed",
      revenue: 75000,
      description:
        "Exciting event where emerging startups present their innovative ideas to investors.",
    },
    {
      id: "5",
      name: "Data Science Symposium",
      date: "2023-11-05",
      location: "Boston, MA",
      attendees: 950,
      status: "postponed",
      revenue: 45000,
      description:
        "Comprehensive symposium covering the latest trends in data science and analytics.",
    },
    {
      id: "6",
      name: "Web Development Bootcamp",
      date: "2022-12-12",
      location: "Los Angeles, CA",
      attendees: 600,
      status: "completed",
      revenue: 85000,
      description:
        "Intensive bootcamp covering modern web development frameworks and best practices.",
    },
    {
      id: "7",
      name: "Mobile App Conference",
      date: "2022-08-20",
      location: "Chicago, IL",
      attendees: 750,
      status: "completed",
      revenue: 110000,
      description:
        "Conference dedicated to mobile application development and emerging mobile technologies.",
    },
    {
      id: "8",
      name: "Cloud Computing Summit",
      date: "2022-04-14",
      location: "Denver, CO",
      attendees: 1100,
      status: "completed",
      revenue: 140000,
      description:
        "Summit exploring cloud infrastructure, security, and scalable computing solutions.",
    },
  ];

  const availableEvents = [1];
  return (
    <section className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Step 1: Select Time Period
          </CardTitle>
          <CardDescription>
            Choose a month and year to view available events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 xl:space-y-8">
          <TimeForm />
        </CardContent>
      </Card>

      {availableEvents.length > 0 ? (
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
            <div className="space-y-2">
              {mockEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {event.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {event.date} • {event.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground">
              No events were found for given time period
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

export default page;
