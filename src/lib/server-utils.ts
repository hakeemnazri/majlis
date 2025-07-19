import "server-only";
import prisma from "./prisma";
import { sleep } from "./utils";
import { ErrorResponse, handleServerActionError } from "./error";
import { Event, Survey, Ticket } from "../../generated/prisma";

type EventWithRelations = Event & {
    survey: Survey[];
    tickets: Ticket[]
}
type TGetAdminDashboardEvents = {
    success: true,
    message: string,
    data: EventWithRelations[]
}


export const getAdminDashboardEvents = async () : Promise<TGetAdminDashboardEvents | ErrorResponse> => {
  try {
    const events = await prisma.event.findMany({
      include: {
        tickets: true,
        survey: true,
      },
    });
    await sleep(2000);

    console.log(events);
    return {
        success: true,
        message: "Events pulled successfully",
        data: events
    };
  } catch (error) {
    return handleServerActionError(error, "getAdminDashboardEvents")
  }
};
