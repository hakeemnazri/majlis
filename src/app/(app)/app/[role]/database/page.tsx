import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import TimeForm from "@/components/admin/event-database/time-form";
import SelectedTimeCard from "@/components/admin/event-database/selected-time-card";

function page() {
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

    <SelectedTimeCard />
    </section>
  );
}

export default page;
