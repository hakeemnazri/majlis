"use client";

import React from "react";
import { BUILD_FORM_HEADERS } from "@/lib/constants/admin.constant";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import { CardTitle, CardDescription } from "../../ui/card";
import { useBuildEventContext } from "@/lib/hooks/buildEvent.hook";
import { Button } from "../../ui/button";
import AnimContainer from "./anim-container";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { TAction } from "@/lib/types";

type BuildFormHeadersProps = {
  action?: TAction;
};

type HeaderTitleProps = {
  action: TAction;
  formPage: number;
};

function BuildFormHeaders({ action = "create" }: BuildFormHeadersProps) {
  const { formPage } = useBuildFormStore((state) => state);
  return (
    <AnimContainer page={formPage}>
      <div className="flex justify-between">
        <HeaderTitle action={action} formPage={formPage} />
        {formPage === 2 && <AddSurveyQuestion />}
      </div>
    </AnimContainer>
  );
}

export default BuildFormHeaders;

// BuildFormHeaders Components

const HeaderTitle = ({ action, formPage }: HeaderTitleProps) => {
  const title = BUILD_FORM_HEADERS[formPage].title;
  const description = BUILD_FORM_HEADERS[formPage].description;
  return (
    <div className="flex flex-col">
      {action === "create" ? (
        <>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </>
      ) : (
        <>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </>
      )}
    </div>
  );
};

const AddSurveyQuestion = () => {
  const {
    survey: { append },
  } = useBuildEventContext();

  const handleAddSurveyQuestion = () => {
    append({
      id: crypto.randomUUID(),
      type: "short_answer",
      question: "",
      options: [""],
    });
  };
  return (
    <>
      <Button type="button" onClick={handleAddSurveyQuestion}>
        Add Question
      </Button>
    </>
  );
};
