import { useBuildEventContext } from "@/lib/hooks/build-event-hooks";
import { cn } from "@/lib/utils";
import React from "react";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { QUESTION_TYPES } from "@/lib/constants/admin.constant";
import { TSurveyQuestion } from "@/lib/types";

type SurveyQuestionProps = {
  surveyDetails: TSurveyQuestion[];
  question: TSurveyQuestion;
  index: number;
};

function FormThirdPage() {
  const {
    form: { watch },
  } = useBuildEventContext();
  const surveyDetails = watch("survey");
  return (
    <>
      {surveyDetails.map((question, index) => (
        <SurveyQuestion
          key={question.id}
          surveyDetails={surveyDetails}
          question={question}
          index={index}
        />
      ))}
    </>
  );
}

export default FormThirdPage;

const SurveyQuestion = ({
  surveyDetails,
  question,
  index,
}: SurveyQuestionProps) => {
  const {
    form: { control, formState },
    survey: { remove, move, update, fields },
  } = useBuildEventContext();

  const handleMoveUpQuestion = (index: number) => {
    move(index, index - 1);
  };
  const handleMoveDownQuestion = (index: number) => {
    move(index, index + 1);
  };
  const handleRemoveQuestion = (index: number) => {
    remove(index);
  };
  const handleAddOption = (index: number) => {
    if (!surveyDetails[index].options) return;
    update(index, {
      ...surveyDetails[index],
      options: [...surveyDetails[index].options, ""],
    });
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    if (!surveyDetails[questionIndex].options) return;
    update(questionIndex, {
      ...surveyDetails[questionIndex],
      options: [
        ...surveyDetails[questionIndex].options.filter(
          (_, i) => i !== optionIndex
        ),
      ],
    });
  };

  if (question.type === "short answer" || question.type === "paragraph") {
    return (
      <Card>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-md font-semibold">
              Question {index + 1}
            </Label>
          </div>
          <div className="space-y-4">
            <FormField
              control={control}
              name={`survey.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-1/2">
                          <SelectValue
                            placeholder="Select question type"
                            className={cn()}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {QUESTION_TYPES.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <div className="space-x-2">
                      {index > 0 && (
                        <Button onClick={() => handleMoveUpQuestion(index)}>
                          Up
                        </Button>
                      )}
                      {index < fields.length - 1 && (
                        <Button onClick={() => handleMoveDownQuestion(index)}>
                          Down
                        </Button>
                      )}
                      <Button onClick={() => handleRemoveQuestion(index)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`survey.${index}.question`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={`Insert ${question.type} question`}
                      {...field}
                      className={cn()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
  if (question.type === "checkboxes" || question.type === "mutliple choice") {
    return (
      <Card>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-md font-semibold">
              Question {index + 1}
            </Label>
          </div>
          <div className="space-y-4">
            <>
              <FormField
                control={control}
                name={`survey.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 w-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-1/2">
                            <SelectValue
                              placeholder="Select question type"
                              className={cn()}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {QUESTION_TYPES.map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      <div className="space-x-2">
                        {index > 0 && (
                          <Button onClick={() => handleMoveUpQuestion(index)}>
                            Up
                          </Button>
                        )}
                        {index < fields.length - 1 && (
                          <Button onClick={() => handleMoveDownQuestion(index)}>
                            Down
                          </Button>
                        )}
                        <Button onClick={() => handleRemoveQuestion(index)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`survey.${index}.question`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={`Insert ${question.type} question`}
                        {...field}
                        value={
                          typeof field.value === "string" ? field.value : ""
                        }
                        className={cn()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
            {/* Options */}
            <section className="space-y-4">
              {question.options?.map((_, i) => (
                <div key={i} className="flex items-center gap-3 w-full">
                  {question.type === "checkboxes" ? (
                    <>
                      <Checkbox disabled className="w-6 h-6" />
                    </>
                  ) : (
                    <>
                      <RadioGroup>
                        <RadioGroupItem className="w-6 h-6" value="" disabled />
                      </RadioGroup>
                    </>
                  )}
                  <FormField
                    control={control}
                    name={`survey.${index}.options.${i}`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder={`Insert ${question.type} option`}
                            {...field}
                            value={
                              typeof field.value === "string" ? field.value : ""
                            }
                            className={cn("")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {i > 0 && (
                    <Button onClick={() => handleRemoveOption(index, i)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}

              <Button onClick={() => handleAddOption(index)}>Add Option</Button>
              {formState.errors?.survey?.[index]?.options?.root?.message && (
                <p className="text-sm text-destructive">
                  {formState.errors.survey[index].options.root?.message}
                </p>
              )}
            </section>
          </div>
        </CardContent>
      </Card>
    );
  }
};
