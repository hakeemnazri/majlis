"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useEventResponseFormContext } from "@/lib/hooks/contexts.hook";
import { useEventResponseFormStore } from "@/stores/event/eventResponseFormStore";
import React, { useEffect } from "react";

function EventResponseForm() {
  const { eventResponseForm } = useEventResponseFormContext();
  const { event, survey, setEvent } = useEventResponseFormStore(
    (state) => state
  );
  if (!survey) throw new Error("Something went wrong");

  useEffect(() => {
    if (event) {
      setEvent(event);
    }
  }, [event, setEvent]);

  return (
    <Form {...eventResponseForm}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {survey.map((question, index) => {
          if (question.type === "SHORT_ANSWER") {
            return (
              <FormField
                key={question.id}
                control={eventResponseForm.control}
                name={`responses.${index}.answer.input`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{question.question}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Enter your ${question.question}`}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if (question.type === "PARAGRAPH") {
            return (
              <FormField
                key={question.id}
                control={eventResponseForm.control}
                name={`responses.${index}.answer.input`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{question.question}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Enter your ${question.question}`}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if (question.type === "MULTIPLE_CHOICE") {
            return (
              <FormField
                key={question.id}
                control={eventResponseForm.control}
                name={`responses.${index}.answer.input`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{question.question}</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange}>
                        {question.options.map((option, i) => (
                          <div className="flex items-center gap-4" key={i}>
                            <RadioGroupItem
                              {...field}
                              value={option}
                              id={option}
                            />
                            <FormLabel>{option}</FormLabel>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if (question.type === "CHECKBOXES") {
            return (
              <div key={question.id}>
                <FormLabel>{question.question}</FormLabel>
                <div className="space-y-3">
                  {question.options.map((option, i) => (
                    <FormField
                      key={i}
                      control={eventResponseForm.control}
                      name={`responses.${index}.answer.checkbox`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Checkbox
                                checked={field.value?.includes(option)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(Array.isArray(field.value)
                                          ? field.value
                                          : []),
                                        option,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== option
                                        )
                                      );
                                }}
                              />
                              <FormLabel>{option}</FormLabel>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                  <FormMessage>
                    {
                      eventResponseForm.formState.errors?.responses?.[index]
                        ?.answer?.checkbox?.message
                    }
                  </FormMessage>
                </div>
              </div>
            );
          }
        })}
      </form>
    </Form>
  );
}

export default EventResponseForm;
