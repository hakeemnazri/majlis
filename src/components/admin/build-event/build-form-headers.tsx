"use client";

import React from "react";
import { BUILD_FORM_HEADERS } from "@/lib/constants/admin.constant";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import { Button } from "../../ui/button";
import AnimContainer from "./anim-container";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBuildEventContext } from "@/lib/hooks/contexts.hook";


function BuildFormHeaders() {
  const { formPage } = useBuildFormStore((state) => state);
  const title = BUILD_FORM_HEADERS[formPage].title;
  const description = BUILD_FORM_HEADERS[formPage].description;
  return (
    <DialogHeader>
      <AnimContainer page={formPage}>
        <div className="flex justify-between">
          <div className="flex flex-col">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
          </div>
          {formPage === 2 && <AddSurveyQuestion />}
        </div>
      </AnimContainer>
    </DialogHeader>
  );
}

export default BuildFormHeaders;

const AddSurveyQuestion = () => {
  const {
    survey: { append },
  } = useBuildEventContext();

  const handleAddSurveyQuestion = () => {
    append({
      id: crypto.randomUUID(),
      type: "SHORT_ANSWER",
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
