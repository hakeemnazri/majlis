import { BuildEventContextProvider } from '@/contexts/build-event-context-provider'
import DashboardTableContextProvider from '@/contexts/dashboard-table-context'
import prisma from '@/lib/prisma'
import React from 'react'

type DashboardWrapperProps = {
    children: React.ReactNode
}

async function DashboardWrapper( {children}: DashboardWrapperProps) {
    const page = parseInt("1");
    const pageSize = parseInt("10");
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
  return (
    <BuildEventContextProvider>
        <DashboardTableContextProvider fetchedData={fetched}>
            {children}
        </DashboardTableContextProvider>
    </BuildEventContextProvider>
  )
}

export default DashboardWrapper