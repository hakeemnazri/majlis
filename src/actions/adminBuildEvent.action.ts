"use server";

import { handleServerActionError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { formSchema2 } from "@/lib/schemas";
import { revalidatePath } from "next/cache";


export async function addEvent(event: unknown) {
  const schema = formSchema2(false);
  const parsedEvent = schema.safeParse(event);
  if (!parsedEvent.success) {
    throw new Error("Invalid event data.");
  }

  try {
    const { tickets, survey, ...rest } = parsedEvent.data;

    const newEvent = await prisma.event.create({
      data: {
        ...rest,
        slug: createSlug(rest.title),
        tickets: {
          create: tickets?.map((ticket, index) => ({
            name: ticket.name,
            price: ticket.price,
            quantity: ticket.quantity,
            description: ticket.description,
            order: index + 1,
          })),
        },
        survey: {
          create: survey.map((item, index) => {
            const base = {
              type: item.type,
              question: item.question,
              order: index + 1,
              isRequired: item.isRequired,
            };
            const options = item.options.map((option) => {
              if (option === undefined || option === null) {
                const string = "";
                return string;
              }
              return option;
            });
            const newItem = { ...base, options };
            return newItem;
          }),
        },
        validation: {
          create: [
            {
              type: "register", //Default validation for each
            },
          ],
        },
      },
    });

    revalidatePath("/app/admin/dashboard"); //TODO: Make this Dynamic

    return {
      success: true,
      message: "Event added successfully",
      data: newEvent,
    };
  } catch (error: unknown) {
    return handleServerActionError(error, "addEvent");
  }
}

 export async function editEvent(event: unknown) {
  try {
    const schema = formSchema2(false);
    const parsedEvent = schema.safeParse(event);
    if (!parsedEvent.success) {
      throw new Error("Invalid event data.");
    }

    const { tickets, survey, ...rest } = parsedEvent.data;

    const editedEvent = await prisma.$transaction(async (tx) => {
      const existingEvent = await tx.event.findFirst({
        where: {
          id: rest.id,
        },
        include: {
          tickets: true,
          survey: true,
        },
      });

      const existingEventSurveyId = existingEvent?.survey.map(
        (survey) => survey.id
      );
      const absentSurveyIds = existingEventSurveyId?.filter(
        (id) => !survey.map((survey) => survey.id).includes(id)
      );

      if (absentSurveyIds && absentSurveyIds?.length > 0) {
        await tx.survey.deleteMany({
          where: {
            id: {
              in: absentSurveyIds,
            },
          },
        });
      }

      const existingEventTicketId = existingEvent?.tickets.map(
        (ticket) => ticket.id
      );
      const absentTicketIds = existingEventTicketId?.filter(
        (id) => !tickets?.map((ticket) => ticket.id).includes(id)
      );

      if (absentTicketIds && absentTicketIds?.length > 0) {
        await tx.tickets.deleteMany({
          where: {
            id: {
              in: absentTicketIds,
            },
          },
        });
      }
      const editedEvent = await tx.event.update({
        where: {
          id: rest.id,
        },
        data: {
          ...parsedEvent.data,
          slug: createSlug(rest.title),
          survey: {
            upsert: survey.map((item, index) => {
              const options = item.options.map((option) => {
                if (option === undefined || option === null) {
                  return "";
                }
                return option;
              });

              return {
                where: {
                  id: item.id,
                },
                create: {
                  order: index + 1,
                  type: item.type,
                  question: item.question,
                  options,
                  isRequired: item.isRequired,
                },
                update: {
                  order: index + 1,
                  type: item.type,
                  question: item.question,
                  options,
                  isRequired: item.isRequired,
                },
              };
            }),
          },
          tickets: {
            upsert: tickets?.map((ticket, index) => {
              return {
                where: {
                  id: ticket.id,
                },
                update: {
                  order: index + 1,
                  name: ticket.name,
                  price: ticket.price,
                  quantity: ticket.quantity,
                  description: ticket.description,
                },
                create: {
                  order: index + 1,
                  name: ticket.name,
                  price: ticket.price,
                  quantity: ticket.quantity,
                  description: ticket.description,
                },
              };
            }),
          },
        },
        include: {
          tickets: true,
          survey: true,
        },
      });

      return editedEvent;
    });

    revalidatePath("/app/admin/dashboard"); //TODO: Make this Dynamic

    return {
      success: true,
      message: "Edit event successfully",
      data: editedEvent,
    };
  } catch (error) {
    return handleServerActionError(error, "editEvent");
  }
}

export async function deleteEvent(eventId: string) {
  try {
    const deletedEvent = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    revalidatePath("/app/admin/dashboard"); //TODO: Make this Dynamic
    return {
      success: true,
      message: "Event deleted successfully",
      data: deletedEvent,
    };
  } catch (error) {
    return handleServerActionError(error, "deleteEvent");
  }
}

function createSlug(str: string) {
  const separator = "-";
  const lowercase = true;
  const strict = false;

  if (!str || typeof str !== "string") {
    return "";
  }

  let slug = str;

  // Convert to lowercase if specified
  if (lowercase) {
    slug = slug.toLowerCase();
  }

  // Remove or replace Unicode characters (emojis, accented characters, etc.)
  // This normalizes accented characters to their base form
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remove emojis and other Unicode symbols
  slug = slug.replace(
    /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
    ""
  );

  if (strict) {
    // Strict mode: only keep alphanumeric characters and spaces
    slug = slug.replace(/[^a-zA-Z0-9\s]/g, "");
  } else {
    // Remove common punctuation and symbols
    slug = slug.replace(/[.,;:!?@#$%^&*()_+={}[\]|\\/<>~`"']/g, "");
  }

  // Replace multiple spaces with single space
  slug = slug.replace(/\s+/g, " ");

  // Trim whitespace from beginning and end
  slug = slug.trim();

  // Replace spaces with separator
  slug = slug.replace(/\s/g, separator);

  // Remove multiple consecutive separators
  const separatorRegex = new RegExp(`\\${separator}+`, "g");
  slug = slug.replace(separatorRegex, separator);

  // Remove separator from beginning and end
  const trimRegex = new RegExp(`^\\${separator}+|\\${separator}+$`, "g");
  slug = slug.replace(trimRegex, "");

  return slug;
}
