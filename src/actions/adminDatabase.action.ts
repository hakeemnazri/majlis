"use server";

import { ErrorResponse, handleServerActionError } from "@/lib/error";
import prisma from "@/lib/prisma";
import {
  editCheckboxSchema,
  editInputSchema,
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

export type SuccessResponse = {
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
            orderBy: {
              Validation: {
                order: "asc",
              },
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
      const validationNumber = await tx.validation.count({
        where: {
          eventId: eventId,
        },
      });

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
            order: validationNumber + 1,
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
              order: validationNumber + 1,
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

export const deleteValidation = async (
  data: unknown
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const parsedData = editInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid data");
    }

    const { id } = parsedData.data;

    await prisma.validation.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/app/admin/database/11"); //TODO: Make this dynamic

    return {
      success: true,
      message: "Validation deleted!",
    };
  } catch (error) {
    return handleServerActionError(error, "addValidation");
  }
};
export const editValidation = async (
  data: unknown
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const parsedData = editInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid data");
    }

    const { id, payload } = parsedData.data;

    await prisma.validation.update({
      where: {
        id: id,
      },
      data: {
        type: payload,
      },
    });

    revalidatePath("/app/admin/database/11"); //TODO: Make this dynamic

    return {
      success: true,
      message: "Validation edited!",
    };
  } catch (error) {
    return handleServerActionError(error, "editValidation");
  }
};

export const editValidationIndex = async (
  data: unknown
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const parsedData = editInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid data");
    }

    const { id, payload } = parsedData.data;

    const result = await prisma.$transaction(async (tx) => {
      const currentValidation = await tx.validation.findUnique({
        where: { id },
        select: { id: true, eventId: true, order: true },
      });

      if (!currentValidation) {
        throw new Error("Validation not found");
      }

      const allValidations = await tx.validation.findMany({
        where: {
          eventId: currentValidation.eventId,
        },
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          order: true,
        },
      });

      const currentIndex = allValidations.findIndex((v) => v.id === id);

      if (currentIndex === -1) {
        throw new Error("Validation not found in list");
      }

      const targetIndex =
        payload === "left" ? currentIndex - 1 : currentIndex + 1;

      if (targetIndex < 0 || targetIndex >= allValidations.length) {
        throw new Error("Invalid target index");
      }

      const targetValidation = allValidations[targetIndex];

      await tx.validation.update({
        where: { id: currentValidation.id },
        data: { order: targetValidation.order },
      });

      await tx.validation.update({
        where: { id: targetValidation.id },
        data: { order: currentValidation.order },
      });

      return {
        success: true,
        message: "index success fully moved",
      };
    });

    return {
      success: true,
      message: result.message,
    };

  } catch (error) {
    return handleServerActionError(error, "editValidationIndex");
  }
};

export const editCheckbox = async (
  data: unknown
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const parsedData = editCheckboxSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid data");
    }
    const id = parsedData.data;

    await prisma.$transaction(async (tx) => {
      const response = await tx.checklist.findFirst({
        where: {
          id: id,
        },
        select: {
          isCheck: true,
        },
      });

      if (!response) {
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

    revalidatePath("/app", "layout");
    //TODO: Make this dynamic

    return {
      success: true,
      message: "Checkbox edited!",
    };
  } catch (error) {
    return handleServerActionError(error, "editCheckbox");
  }
};

export const editInput = async (
  data: unknown
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const parsedData = editInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid data");
    }

    const { id, payload } = parsedData.data;

    await prisma.answer.update({
      where: {
        id: id,
      },
      data: {
        input: payload,
      },
    });

    revalidatePath("/app/admin/database");

    return {
      success: true,
      message: "Input edited!",
    };
  } catch (error) {
    return handleServerActionError(error, "editInput");
  }
};

function createDateRange(month: string, year: string) {
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);

  const startDate = new Date(yearNum, monthNum, 1);
  const endDate = new Date(yearNum, monthNum + 1, 1);

  return { startDate, endDate };
}
