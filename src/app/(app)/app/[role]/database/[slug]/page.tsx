
import EventDatabaseTable from "@/components/admin/event-database/slug/EventDatabaseTable";
import EventDatabaseTableContextProvider from "@/contexts/event-database-table-context";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

type pageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function page({ params }: pageProps) {
  const resolvedParams = await params;
  const page = 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const fetchedData = await prisma.$transaction(async (tx) => {
    const event = await tx.event.findFirst({
      where: {
        slug: resolvedParams.slug,
      },
    });

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
        tag: true,
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
      totalResponsesCount,
      totalPages,
      canGetPreviousPage,
      isFinalPage,
    };
  });

  if (fetchedData.event === null) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 lg:px-6">
      <EventDatabaseTableContextProvider
        fetchedData={{
          ...fetchedData,
          event: fetchedData.event!,
        }}
      >
        <EventDatabaseTable />
      </EventDatabaseTableContextProvider>
    </section>
  );
}

export default page;
