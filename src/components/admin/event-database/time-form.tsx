"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { timeFormSchema } from "@/lib/schemas";
import { TTimeFormSchema } from "@/lib/types";
import { MONTHS, YEARS } from "@/lib/constants/admin.constant";
import { searchEventByTime } from "@/actions/adminDatabase.action";
import { toast } from "sonner";
import { useDatabaseStore } from "@/stores/admin/databaseStore";


function TimeForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const {setSearchEvents} = useDatabaseStore((state) => state);
  const timeForm = useForm<TTimeFormSchema>({
    resolver: zodResolver(timeFormSchema),
    defaultValues: {
      month: "",
      year: "",
    },
  });

  async function onSubmitTime(data: TTimeFormSchema) {
    setIsLoading(true);
    const result  = await searchEventByTime(data);
    
    setIsLoading(false);
    if(!result.success){
      return toast.error(result.error);
    }
    toast.success(result.message);
    setSearchEvents(result.events);
  }

  return (
    <Form {...timeForm}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-4">
          <FormField
            control={timeForm.control}
            name="month"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Month</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MONTHS.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={timeForm.control}
            name="year"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Year</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {YEARS.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full justify-end gap-4">
          <Button type="button" onClick={() => {
            setSearchEvents(null);
            timeForm.reset()}
          }
            
            disabled={isLoading}>
            Reset
          </Button>
          <Button type="button" onClick={timeForm.handleSubmit(onSubmitTime)}
          disabled={isLoading}>
            {isLoading ? "Loading..." : "Find Events"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TimeForm;
