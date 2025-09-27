"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addValidation(id: string) {
  try {
    await prisma.$transaction(async (tx) => {
      const validationNumber = await tx.validation.count({
        where: {
          eventId: id,
        },
      });

      const [totalResponses, newValid] = await Promise.all([
        tx.response.findMany({
          where: {
            eventId: id,
          },
          select: {
            id: true,
          },
        }),
        tx.validation.create({
          data: {
            type: "meow",
            eventId: id,
            order: validationNumber + 1,
          },
          select: {
            id: true,
          },
        }),
      ]);

      totalResponses.forEach(async (response) => {
        await tx.checklist.create({
          data: {
            isCheck: false,
            validationId: newValid.id,
            responseId: response.id,
            order: validationNumber + 1,
          },
        });
      });
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
