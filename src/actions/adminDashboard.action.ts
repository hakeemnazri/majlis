"use server";

import prisma from "@/lib/prisma";
import { PaginatedEvents } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const setAdminDashboardPagination = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const skip = (page - 1) * pageSize;
  const fetched: PaginatedEvents = await prisma.$transaction(async (tx) => {
    const [paginatedEvents, totalCount] = await Promise.all([
      prisma.event.findMany({
        include: {
          survey: {
            orderBy: {
              order: "asc",
            },
          },
          tickets: {
            orderBy: {
              order: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: pageSize,
      }),
      tx.event.count(),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);
    const canGetPreviousPage = page > 1;
    const isFinalPage = page >= totalPages;

    return {
      data: paginatedEvents,
      totalCount,
      totalPages,
      canGetPreviousPage,
      isFinalPage,
    };
  });

  revalidatePath("/admin/dashboard"); //TODO: Make this dynamic

  return fetched;
};
