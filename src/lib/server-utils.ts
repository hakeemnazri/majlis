import "server-only";

import prisma from "./prisma";
import { sleep } from "./utils";
import { ErrorResponse, handleServerActionError } from "./error";
import { TGetAdminDashboardEvents } from "./types";

export const getAdminDashboardEvents = async () : Promise<TGetAdminDashboardEvents | ErrorResponse> => {
  try {
    const events = await prisma.event.findMany({
      include: {
        ticket: {
          orderBy: {
            order: "asc"
          }
        },
        survey: {
          orderBy: {
            order: "asc"
          }
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    await sleep(2000);

    return {
        success: true,
        message: "Events pulled successfully",
        data: events
    };
  } catch (error) {
    return handleServerActionError(error, "getAdminDashboardEvents")
  }
};
