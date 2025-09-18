"use server";

import { handleServerActionError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { strictSurveyQuestionInputSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export const submitEventSurveyForm = async (response: unknown) => {
  const parsedResponse =
    strictSurveyQuestionInputSchema(false).safeParse(response);

  if (!parsedResponse.success) {
    return {
      success: false,
      message: "Invalid event data.",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const [lastResponse, event] = await Promise.all([
        tx.response.findFirst({
          where: {
            eventId: parsedResponse.data.eventId,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        tx.event.findFirst({
          where: {
            id: parsedResponse.data.eventId,
          },
          select: {
            validation: true,
          },
        }),
      ]);

      await prisma.response.create({
        data: {
          eventId: parsedResponse.data.eventId,
          order: lastResponse ? lastResponse.order + 1 : 1,
          answer: {
            create: parsedResponse.data.responses.map((response, index) => ({
              surveyId: response.id,
              input:
                response.answer.input === "" ? null : response.answer.input,
              checkbox: response.answer.checkbox,
              order: index,
            })),
          },
          checklist: {
            create: event?.validation.map((validation) => ({
              validationId: validation.id,
              isCheck: false,
            })),
          },
        },
      });
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Survey submitted successfully!",
    };
  } catch (error: unknown) {
    return handleServerActionError(error, "submitEventSurveyForm");
  }
};
