import { EVENT_SECOND_PAGE_FORM_QUESTIONS } from "@/lib/constants/admin.constant";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useBuildEventContext } from "@/lib/hooks/build-event-hooks";

function EventDetails() {
  const {form} = useBuildEventContext();
  const { watch } = form;
  const category = watch("category");
  return (
    <>
      {EVENT_SECOND_PAGE_FORM_QUESTIONS.map((question) => {
        if (
          category === "infaq" &&
          question.label === "frequency" &&
          question.type === "select"
        )
          return null;

        if (
          category !== "infaq" &&
          question.label === "donationTarget" &&
          question.type === "text"
        ) {
          return null;
        }

        if (question.type === "textarea") {
          return (
            <FormField
              key={question.label}
              control={form.control}
              name={question.label}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{question.title}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={question.placeholder}
                      {...field}
                      value={typeof field.value === "string" ? field.value : (field.value === null || field.value === undefined ? "" : field.value.toString())}
                      className={cn("min-h-16", question.className)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        }
        if (question.type === "select") {
          return (
            <FormField
              key={question.label}
              control={form.control}
              name={question.label}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{question.title}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={question.placeholder}
                          className={cn(question.className)}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {question.options?.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item === "pkam"
                            ? item.toUpperCase()
                            : item.charAt(0).toUpperCase() + item.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        }

        return (
          <FormField
            key={question.label}
            control={form.control}
            name={question.label}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question.title}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={question.placeholder}
                    {...field}
                    value={typeof field.value === "string" ? field.value : (field.value === null || field.value === undefined ? "" : field.value.toString())}
                    className={cn(question.className)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </>
  );
}

export default EventDetails;
