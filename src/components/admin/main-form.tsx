"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { TForm } from "@/lib/types";
import { formSchema } from "@/lib/schemas";
import { Button } from "../ui/button";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  EVENT_FIRST_PAGE_FORM_QUESTIONS,
  EVENT_SECOND_PAGE_FORM_QUESTIONS,
  validateFirstPage,
  validateSecondPage,
} from "@/lib/constants/admin.constant";
import { Input } from "../ui/input";

type FormStageButtonsProps = {
  prevFormPage: () => void;
  nextFormPage: () => void;
  formPage: number;
  form: UseFormReturn<TForm>;
};

type FormFirstPageProps = {
  form: UseFormReturn<TForm>;
};

function MainForm() {
  // store
  const { nextFormPage, prevFormPage, formPage } = useBuildFormStore(
    (state) => state
  );
  // react-hook-form
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      description: "",
      eventHost: "",
      eventImage: "",
      frequency: "",
      donationTarget: 0,
      reference: "",
    },
    mode: "onSubmit",
  });
  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="space-y-6">
          {formPage === 0 && <FormFirstPage form={form} />}

          {formPage === 1 && <FormSecondPage form={form} />}
        </form>
      </Form>

      <FormStageButtons
        prevFormPage={prevFormPage}
        nextFormPage={nextFormPage}
        formPage={formPage}
        form={form}
      />
    </div>
  );
}

export default MainForm;

function FormStageButtons({
  prevFormPage,
  nextFormPage,
  formPage,
  form,
}: FormStageButtonsProps) {
  const { trigger, watch, handleSubmit } = form;
  const category = watch("category");

  const handleNextPage = async () => {
    const isValid = await trigger(validateFirstPage, { shouldFocus: true });
    if (!isValid) return;
    nextFormPage();
  };

  const handlePrevPage = () => {
    prevFormPage();
  };

  const handleFormSubmit = async () => {
    let validateFieldsArray;
    if (category === "infaq") {
      validateFieldsArray = validateSecondPage.filter(
        (field) => field !== "frequency"
      );
    }
    if (category !== "infaq") {
      validateFieldsArray = validateSecondPage.filter(
        (field) => field !== "donationTarget"
      );
    }
    const isValid = await trigger(validateFieldsArray, { shouldFocus: true });
    if (!isValid) return;
    handleSubmit((data) => console.log(data))();
  };
  return (
    <div className="flex justify-between w-full">
      {formPage !== 0 ? (
        <Button onClick={handlePrevPage}>Previous</Button>
      ) : (
        <div />
      )}
      {formPage === 0 ? (
        <Button onClick={handleNextPage}>next</Button>
      ) : (
        <Button onClick={handleFormSubmit}>submit</Button>
      )}
    </div>
  );
}

function FormFirstPage({ form }: FormFirstPageProps) {
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
function FormSecondPage({ form }: FormFirstPageProps) {
  const { watch } = form;
  const category = watch("category");
  return (
    <>
      {EVENT_SECOND_PAGE_FORM_QUESTIONS.map((question) => {
        if (typeof question === null) return null;
        if (category === "infaq" && question.label === "frequency") return null;

        if (category !== "infaq" && question.label === "donationTarget")
          return null;

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
                    value={field.value ?? ""}
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
