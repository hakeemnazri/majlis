"use server";

import { ErrorResponse, handleServerActionError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { timeFormSchema } from "@/lib/schemas";
import { Prisma } from "../../generated/prisma";

export type EventWithinTimeSelect = Prisma.EventGetPayload<{
  select: {
    id: true;
    title: true;
    createdAt: true;
    category: true;
    host: true;
    slug: true;
  }
}>;

export type SuccessResponse = {
  success: true;
  message: string;
  events: EventWithinTimeSelect[];
};

export const searchEventByTime = async (data: unknown) : Promise<SuccessResponse | ErrorResponse> => {
  try {
    const parsedData = timeFormSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid data");
    }

    const { startDate, endDate } = createDateRange(
      parsedData.data.month,
      parsedData.data.year
    );

    const eventsWithinTime = await prisma.event.findMany({
      where: {
        createdAt: {
          gte: startDate,
          // Greater than or equal to start of month
          lt: endDate,
          // Less than start of next month
        },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: true,
        host: true,
        slug: true,
      }
    });

    return {
      success: true,
      message: "Events found!",
      events: eventsWithinTime,
    };

  } catch (error) {
    return handleServerActionError(error, "submitEventSurveyForm");
  }
};

function createDateRange(month: string, year: string) {
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);

  const startDate = new Date(yearNum, monthNum, 1);
  const endDate = new Date(yearNum, monthNum + 1, 1);

  return { startDate, endDate };
}
