"use client";

import React from "react";
import { BUILD_FORM_HEADERS } from "@/lib/constants/admin.constant";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import { CardTitle, CardDescription } from "../ui/card";
import { useBuildEventContext } from "@/lib/hooks/build-event-hooks";
import { Button } from "../ui/button";
import { generateCUID } from "@/lib/utils";
import AnimContainer from "./anim-container";

function BuildFormHeaders() {
  const { formPage } = useBuildFormStore((state) => state);
  return (
    <AnimContainer key={formPage}>
      <div className="flex justify-between">
        <CardHeader formPage={formPage} />
        {formPage === 2 && <AddSurveyQuestion />}
      </div>
    </AnimContainer>
  );
}

export default BuildFormHeaders;

// BuildFormHeaders Components

const CardHeader = ({ formPage }: { formPage: number }) => {
  return (
    <div className="flex flex-col">
      <CardTitle>{BUILD_FORM_HEADERS[formPage].title}</CardTitle>
      <CardDescription>
        {BUILD_FORM_HEADERS[formPage].description}
      </CardDescription>
    </div>
  );
};

const AddSurveyQuestion = () => {
  const {
    survey: { append },
  } = useBuildEventContext();

  const handleAddSurveyQuestion = () => {
    append({
      id: generateCUID(),
      type: "short answer",
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
