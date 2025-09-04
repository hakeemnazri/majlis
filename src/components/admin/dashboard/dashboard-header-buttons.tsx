"use client";

import { Button } from "@/components/ui/button";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import { Plus } from "lucide-react";
import React from "react";

function DashboardHeaderButtons() {
  const { handleCreateEvent } = useBuildFormStore((state) => state);

  return (
    <div className="flex items-center justify-end">
      <Button onClick={handleCreateEvent} variant="outline" size="sm">
        <Plus />
        <span className="hidden lg:inline">Add Section</span>
      </Button>
    </div>
  );
}

export default DashboardHeaderButtons;
