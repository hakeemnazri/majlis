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
          upsert: parsedEvent.data.survey.map((item, index) => {
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
              create:{
                order: index + 1,
                type: item.type,
                question: item.question,
                options,
              },
              update: {
                order: index + 1,
                type: item.type,
                question: item.question,
                options,
              }
            };
          }),
        },
        tickets: {
          upsert: parsedEvent.data.tickets?.map((ticket, index) => {
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
              }
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
