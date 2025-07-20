"use server";

import { handleServerActionError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { formSchema2 } from "@/lib/schemas";

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
    console.log(event)

    return {
      success: false,
      message: "Invalid event data.",
    }
    
  } catch (error) {
    return handleServerActionError(error, "editEvent");
  }
}
