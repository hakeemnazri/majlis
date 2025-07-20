"use server";

import { handleServerActionError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { formSchema2 } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function addEvent(event: unknown) {
  const schema = formSchema2(false);
  const parsedEvent = schema.safeParse(event);
  if (!parsedEvent.success) {
    return {
      success: false,
      message: "Invalid event data.",
    };
  }

  try {
    const { tickets, survey, ...rest } = parsedEvent.data;

    const newEvent = await prisma.event.create({
      data: {
        ...rest,
        tickets: {
          create: tickets?.filter((ticket) => ({
            name: ticket.name,
            price: ticket.price,
            quantity: ticket.quantity,
            description: ticket.description,
          })),
        },
        survey: {
          create: survey.map((item) => {
            const base = {
              type: item.type,
              question: item.question,
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
      },
    });

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
      return {
        success: false,
        message: "Invalid event data.",
      };
    }

    const editedEvent = await prisma.event.update({
      where: {
        id: parsedEvent.data.id,
      },
      data: {
        ...parsedEvent.data,
        survey: {
          update: parsedEvent.data.survey.map((item) => {
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
              data: {
                type: item.type,
                question: item.question,
                options,
              },
            };
          }),
        },
        tickets: {
          update: parsedEvent.data.tickets?.map((ticket) => {
            return {
              where: {
                id: ticket.id,
              },
              data: {
                name: ticket.name,
                price: ticket.price,
                quantity: ticket.quantity,
                description: ticket.description,
              },
            };
          }),
        },
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Edit event successfully",
      data: editedEvent,
    };
  } catch (error) {
    return handleServerActionError(error, "editEvent");
  }
}
