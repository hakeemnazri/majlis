"use server";

import { ErrorResponse, handleServerActionError } from "@/lib/error";
import prisma from "@/lib/prisma";
import {
  editCheckboxSchema,
  eventDatabasePaginationSchema,
  nameSchema,
  timeFormSchema,
} from "@/lib/schemas";
import { Prisma } from "../../generated/prisma";
import { revalidatePath } from "next/cache";
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

type SuccessResponse = {
  success: true;
  message: string;
};

type SearchEvent = {
  events: EventWithinTimeSelect[];
};
type DatabasePagination = {
  events: EventData;
};

export const searchEventByTime = async (
  data: unknown
): Promise<(SuccessResponse & SearchEvent) | ErrorResponse> => {
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

export const setAdminEventDatabasePagination = async (
  data: unknown
): Promise<(SuccessResponse & DatabasePagination) | ErrorResponse> => {
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

      if (!event) {
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

export const addValidation = async (
  data: unknown
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const parsedData = nameSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid data");
    }

    const { name, eventId } = parsedData.data;

    prisma.$transaction(async (tx) => {
      const [eventTotalResponses, newValidation] = await Promise.all([
        tx.response.findMany({
          where: {
            eventId: eventId,
          },
          select: {
            id: true,
          },
        }),
        tx.validation.create({
          data: {
            type: name,
            eventId: eventId,
          },
          select: {
            id: true,
          },
        }),
      ]);

      await Promise.all(
        eventTotalResponses.map(async (response) => {
          return tx.checklist.create({
            data: {
              isCheck: false,
              validationId: newValidation.id,
              responseId: response.id,
            },
          });
        })
      );
    });

    revalidatePath("/app/admin/database/11"); //TODO: Make this dynamic

    return {
      success: true,
      message: "Validation added!",
    };
  } catch (error) {
    return handleServerActionError(error, "addValidation");
  }
};

export const editCheckbox = async (data: unknown) : Promise<SuccessResponse | ErrorResponse> => {
  try {
    const parsedData = editCheckboxSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid data");
    }
    const id  = parsedData.data;

    await prisma.$transaction(async (tx) => {
      const response = await tx.checklist.findFirst({
        where: {
          id: id,
        },
        select: {
          isCheck: true,
        },
      });

      if(!response) {
        throw new Error("id not found");
      }

      await tx.checklist.update({
        where: {
          id: id,
        },
        data: {
          isCheck: !response.isCheck,
        },
      });
    });

    revalidatePath("/app/admin/database/11"); //TODO: Make this dynamic

    return{
      success: true,
      message: "Checkbox edited!",
    }

  } catch (error) {
    return handleServerActionError(error, "editCheckbox");
  }
};

function createDateRange(month: string, year: string) {
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);

  const startDate = new Date(yearNum, monthNum, 1);
  const endDate = new Date(yearNum, monthNum + 1, 1);

  return { startDate, endDate };
}
