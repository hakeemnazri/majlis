"use client";

import React from "react";
import { Survey } from "../../../generated/prisma";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { submitEventSurveyForm } from "@/actions/eventFormSubmit";

type EventProp = {
  id: string;
  survey: Survey[];
}

type SurveyQuestionsProps = {
  event: EventProp;
};

export const surveyQuestionsSchema = z.object({
  eventId: z.string(),
  responses: z.array(
      z.object({
          id: z.string(),
          answer: z.union([z.string(), z.array(z.string())])
      })
  ),
});
function SurveyQuestions({ event }: SurveyQuestionsProps) {

  const form = useForm<z.infer<typeof surveyQuestionsSchema>>({
    resolver: zodResolver(surveyQuestionsSchema),
    defaultValues: {
        eventId: event.id,
        responses: event.survey.map((question) => ({
            id: question.id,
            answer: undefined
        }))
    }
  });

  function onSubmit(values: z.infer<typeof surveyQuestionsSchema>) {
    
    console.log(values);
    submitEventSurveyForm(values)
  }
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {event.survey.map((question, index) => (
            <FormField
              key={question.id}
              control={form.control}
              name={`responses.${index}.answer`}
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
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default SurveyQuestions;
