import Table from "@/components/admin/event-database/slug/table";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

type pageProps = {
  params: {
    slug: string;
  };
};

async function page({ params }: pageProps) {
  const event = await prisma.event.findFirst({
    where: {
      slug: params.slug,
    },
    include:{
      response: {
        include:{
          answer: true,
          upload: true,
          remark: true,
          tag: true,
          checklist: {
            include: {
              Validation: true
            }
          }
        }
      }
    }
  });

  if (event === null) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 lg:px-6">
      <Table data={event} />
    </section>
  );
}

export default page;
