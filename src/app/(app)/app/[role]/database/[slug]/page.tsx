import EventDatabaseTable from "@/components/admin/event-database/slug/event-database-table";
import EventDatabaseTableContextProvider from "@/contexts/event-database-table-context";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

type pageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    pageNumber: string;
    pageSize: string;
  }>;
};

async function page({ params, searchParams }: pageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.pageNumber) || 1;
  const pageSize = parseInt(resolvedSearchParams.pageSize) || 10;
  const skip = (page - 1) * pageSize;

  const fetchedData = await prisma.$transaction(async (tx) => {
    const event = await tx.event.findFirst({
      where: {
        slug: resolvedParams.slug,
      },
      include:{
        survey: true,
      }
    });

    const responses = await tx.response.findMany({
      where: {
        eventId: event?.id,
      },
      include: {
        upload: true,
        remark: true,
        answer: {
          include: {
            survey: true,
          },
        },
        tag: {
          include: {
            AddedProps: true,
          },
        },
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
      currentPage: page,
      currentPageSize: pageSize,
      totalResponsesCount,
      totalPages,
      canGetPreviousPage,
      isFinalPage,
    };
  });

  if (fetchedData.event === null) {
    notFound();
  }
////////////////////////////////////
  const id = "cmfuryjja0000tyd20qphwet1";
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      survey: true,
      response: {
        include: {
          answer: {
            include: {
              survey: true,
            },
          },
          checklist: {
            include: {
              Validation: true,
            }
          },
        },
      },
    },
  });

  if (!event) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 lg:px-6">
      <EventDatabaseTableContextProvider
        fetchedData={{
          ...fetchedData,
          event: fetchedData.event!,
          survey: event.survey,
        }}
      >
        <EventDatabaseTable />
      </EventDatabaseTableContextProvider>
    </section>
  );
}

export default page;
