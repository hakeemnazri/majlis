"use server";

import { surveyQuestionsSchema } from "@/components/checkout/survey-questions";

export const submitEventSurveyForm = async(response : unknown) => {
    const parsedResponse = surveyQuestionsSchema.safeParse(response);

    if(!parsedResponse.success) {
        return {
          success: false,
          message: "Invalid event data.",
        }
    }

    console.log(parsedResponse.data);
}