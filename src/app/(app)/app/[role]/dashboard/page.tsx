import DashboardTable from "@/components/admin/dashboard/dashboard-table";
import DashboardWrapper from "@/components/admin/dashboard/dashboard-wrapper";
import { SectionCards } from "@/components/admin/dashboard/section-card";
import React, { Suspense } from "react";

type ParamsProps = {
  params: Promise<{
    role: string;
  }>;
};

async function page({ params }: ParamsProps) {
  const resolvedParams = await params;
  console.log(resolvedParams.role);

  return (
    <section className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {/* add loading animation skeleton for dashboard */}
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardWrapper>
          <SectionCards />
          <DashboardTable />
        </DashboardWrapper>
      </Suspense>
    </section>
  );
}

export default page;
