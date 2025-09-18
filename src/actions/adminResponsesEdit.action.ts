"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addValidation(id: string) {
  try {
    const [eventTotalResponses, newValidation] = await Promise.all([
      prisma.response.findMany({
        where: {
          eventId: id,
        },
        select: {
          id: true,
        },
      }),
      prisma.validation.create({
        data: {
          type: "meow",
          eventId: id,
        },
        select: {
          id: true,
        },
      }),
    ]);

    eventTotalResponses.forEach(async (response) => {
      await prisma.checklist.create({
        data: {
          isCheck: false,
          validationId: newValidation.id,
          responseId: response.id,
        },
      });
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
