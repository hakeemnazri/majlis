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
  const events = await prisma.event.findMany();
  return (
    <section>
      <DashboardTableContextProvider data={events}>
        <BuildEventContextProvider>
          <DashboardTable />
        </BuildEventContextProvider>
      </DashboardTableContextProvider>
    </section>
  );
}

export default page;
