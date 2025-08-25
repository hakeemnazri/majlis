"use server";

import { handleServerActionError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { strictSurveyQuestionInputSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export const submitEventSurveyForm = async (response: unknown) => {
  const parsedResponse = strictSurveyQuestionInputSchema(false).safeParse(response);

  if (!parsedResponse.success) {
    return {
      success: false,
      message: "Invalid event data.",
    };
  }
  try {
    await prisma.response.create({
      data: {
        eventId: parsedResponse.data.eventId,
        answer: {
          create: parsedResponse.data.responses.map((response) => ({
            surveyId: response.id,
            input: response.answer.input === "" ? null : response.answer.input,
            checkbox: response.answer.checkbox,
          })),
        },
      },
      include: {
        answer: true,
      },

    });

    const meow = await prisma.event.findMany({
      include: {
        response: true,
      }
    })

    console.log(meow)

    revalidatePath("/");

    return {
      success: true,
      message: "Survey submitted successfully!",
    }
  } catch (error: unknown) {
    return handleServerActionError(error, "submitEventSurveyForm");
  }
};
