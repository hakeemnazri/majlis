"use server";

import { ErrorResponse, handleServerActionError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { timeFormSchema } from "@/lib/schemas";
import { Prisma } from "../../generated/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { EventData } from "@/components/admin/event-database/slug/table-data";

export type EventWithinTimeSelect = Prisma.EventGetPayload<{
  select: {
    id: true;
    title: true;
    createdAt: true;
    category: true;
    host: true;
    slug: true;
  };
}>;

type SuccessSearchEventResponse = {
  success: true;
  message: string;
  events: EventWithinTimeSelect[];
};
type SuccessDatabasePaginationResponse = {
  success: true;
  message: string;
  events: EventData;
};

export const searchEventByTime = async (
  data: unknown
): Promise<SuccessSearchEventResponse | ErrorResponse> => {
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
      },
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

const eventDatabasePaginationSchema = z.object({
  page: z.number().min(1),
  pageSize: z.number().min(10).max(20),
  slug: z.string(),
});

export const setAdminEventDatabasePagination = async (
  data: unknown
): Promise<SuccessDatabasePaginationResponse | ErrorResponse> => {
  try {
    const parsedData = eventDatabasePaginationSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid pagination data");
    }

    const { page, pageSize, slug } = parsedData.data;

    const skip = (page - 1) * pageSize;
    const fetchedData = await prisma.$transaction(async (tx) => {
      const event = await tx.event.findFirst({
        where: {
          slug: slug,
        },
      });

      if(!event) {
        throw new Error("Event not found");
      }

      const responses = await tx.response.findMany({
        where: {
          eventId: event?.id,
        },
        include: {
          answer: {
            include: {
              survey: true,
            },
          },
          upload: true,
          remark: true,
          tag: {
            include: {
              AddedProps: true,
            },
          },
          checklist: {
            include: {
              Validation: true,
            },
          },
        },
        skip,
        take: pageSize,
      });

      const totalResponsesCount = await tx.response.count({
        where: {
          eventId: event?.id,
        },
      });

      if(fetchedData.event === null) {
        throw new Error("Event not found");
      }

      const totalPages = Math.ceil(totalResponsesCount / pageSize);
      const canGetPreviousPage = page > 1;
      const isFinalPage = page >= totalPages;

      return {
        event,
        responses,
        currentPage: page,
        totalResponsesCount,
        totalPages,
        canGetPreviousPage,
        isFinalPage,
      };
    });

    revalidatePath("/admin/dashboard"); //TODO: Make this dynamic

    return {
      success: true,
      message: "Events found!",
      events: fetchedData,
    };
  } catch (error) {
    return handleServerActionError(error, "setAdminEventDatabasePagination");
  }
};

function createDateRange(month: string, year: string) {
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);

  const startDate = new Date(yearNum, monthNum, 1);
  const endDate = new Date(yearNum, monthNum + 1, 1);

  return { startDate, endDate };
}
