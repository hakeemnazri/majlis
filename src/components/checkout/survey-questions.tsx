"use client";

import { Survey } from "../../../generated/prisma";
import { FieldPath, useForm } from "react-hook-form";
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
import z from "zod";
import { surveyQuestionsSchema } from "@/lib/schemas";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type EventProp = {
  id: string;
  survey: Survey[];
};

type SurveyQuestionsProps = {
  event: EventProp;
};

function SurveyQuestions({ event }: SurveyQuestionsProps) {
  const form = useForm<z.infer<typeof surveyQuestionsSchema>>({
    resolver: zodResolver(surveyQuestionsSchema),
    defaultValues: {
      eventId: event.id,
      responses: event.survey.map((question) => ({
        id: question.id,
        answer: {
          input: undefined,
          checkbox: [],
        },
      })),
    },
  });

  async function onSubmit() {
    const values = form.watch();
    const formProps = [
      "eventId",
      ...event.survey.map((question, index) => {
        if (question.type === "CHECKBOXES") {
          return "responses." + index + ".answer.checkbox";
        } else {
          return "responses." + index + ".answer.input";
        }
      }),
    ] as FieldPath<z.infer<typeof surveyQuestionsSchema>>[];
    const validateForm = await form.trigger(formProps);
    if (!validateForm) return;

    submitEventSurveyForm(values);
    form.reset({
      eventId: event.id,
      responses: event.survey.map((question) => ({
        id: question.id,
        answer: {
          input: undefined,
          checkbox: [],
        },
      })),
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          {event.survey.map((question, index) => {
            if (question.type === "SHORT_ANSWER") {
              return (
                <FormField
                  key={question.id}
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                        control={form.control}
                        name={`responses.${index}.answer.checkbox`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center gap-4">
                                <Checkbox
                                  checked={field.value?.includes(option)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, option])
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
                        form.formState.errors?.responses?.[index]?.answer
                          ?.checkbox?.message
                      }
                    </FormMessage>
                  </div>
                </div>
              );
            }
          })}
        </form>
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </>
  );
}

export default SurveyQuestions;
