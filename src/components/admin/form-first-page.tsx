import React from "react";
import { EVENT_FIRST_PAGE_FORM_QUESTIONS } from "@/lib/constants/admin.constant";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useBuildEventContext } from "@/lib/hooks/buildEvent.hook";

function FormFirstPage() {
  const { form } = useBuildEventContext();
  return (
    <>
      {EVENT_FIRST_PAGE_FORM_QUESTIONS.map((question) => (
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
                    <SelectValue placeholder={question.placeholder} />
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
      ))}
    </>
  );
}

export default FormFirstPage;
