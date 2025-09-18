"use server";

import { handleServerActionError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { timeFormSchema } from "@/lib/schemas";

export const searchEventByTime = async (data: unknown) => {
  try {
    const parsedData = timeFormSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        success: false,
        message: "Invalid data.",
      };
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
    });

    return {
      success: true,
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
