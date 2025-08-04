"use server";

import prisma from "@/lib/prisma";
import { surveyQuestionsSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export const submitEventSurveyForm = async(response : unknown) => {
    const parsedResponse = surveyQuestionsSchema.safeParse(response);
    console.log(parsedResponse.success);
    if(!parsedResponse.success) {
        return {
          success: false,
          message: "Invalid event data.",
        }
    }

  const newResponse = await prisma.response.create({
    data:{
      eventId: parsedResponse.data.eventId,
      answer: {
        create: parsedResponse.data.responses.map((response) => ({
          surveyId: response.id,
          input: response.answer.input,
          checkbox: response.answer.checkbox,
        }))
      }
    },
    include: {
      answer: true
    }
  })

  revalidatePath("/")
}