"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import TableData from "./table-data";
import { Plus } from "lucide-react";

function DashboardTable() {

  return (
    <section className="w-full flex flex-col justify-start gap-4">
      <div className="flex items-center justify-end px-4 lg:px-6">
        <Button variant="outline" size="sm">
          <Plus />
          <span className="hidden lg:inline">Add Section</span>
        </Button>
      </div>

      <TableData/>

      
    </section>
  );
}

export default DashboardTable;
