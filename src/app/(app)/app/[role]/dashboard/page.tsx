import DashboardTable from "@/components/admin/dashboard/dashboard-table";
import { BuildEventContextProvider } from "@/contexts/build-event-context-provider";
import DashboardTableContextProvider from "@/contexts/dashboard-table-context";
import prisma from "@/lib/prisma";
import React from "react";

type ParamsProps = {
  params: Promise<{
    role: string;
  }>;
};

async function page({ params }: ParamsProps) {
  const resolvedParams = await params;
  console.log(resolvedParams.role);
  const page = parseInt('1');
  const pageSize = parseInt('2');
  const skip = (page - 1) * pageSize;

  const fetched = await prisma.$transaction(async (tx) => {
    const [paginatedEvents, totalCount] = await Promise.all([
      prisma.event.findMany({
        skip,
        take: pageSize,
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
      }),
      tx.event.count()
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);
    const isFinalPage = page >= totalPages;

    return {
      data: paginatedEvents,
      totalCount,
      totalPages,
      isFinalPage
    };
  })

  return (
    <section>
      <BuildEventContextProvider>
        <DashboardTableContextProvider data={fetched.data}>
          <DashboardTable />
          <p>{fetched.totalCount}</p>
          <p>{fetched.totalPages}</p>
          <p>{fetched.isFinalPage.toString()}</p>
        </DashboardTableContextProvider>
      </BuildEventContextProvider>
    </section>
  );
}

export default page;
