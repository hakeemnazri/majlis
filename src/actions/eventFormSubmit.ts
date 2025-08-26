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
      const lastResponse = await tx.response.findFirst({
        where: {
          eventId: parsedResponse.data.eventId,
        },
        include:{
          validation: true
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      await prisma.response.create({
        data: {
          eventId: parsedResponse.data.eventId,
          order: lastResponse ? lastResponse.order + 1 : 1,
          validation:{
            create: {
              isCheck: false,
              
            }
          }
          answer: {
            create: parsedResponse.data.responses.map((response, index) => ({
              surveyId: response.id,
              input:
                response.answer.input === "" ? null : response.answer.input,
              checkbox: response.answer.checkbox,
              order: index,
            })),
          },
        }
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
