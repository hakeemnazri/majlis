"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { EventResponse } from "./table-data";

type ActionCellProps = {
  row: Row<EventResponse>;
};

function EventDatabaseActionCell({ row }: ActionCellProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
          size="icon"
        >
          <EllipsisVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-42">
        <DropdownMenuItem
          onClick={() => {
            console.log(row.original);
          }}
        >
          Resend Email
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            console.log(row.original);
          }}
        >
          Upload Image
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            console.log(row.original);
          }}
        >
          Revoke Tickets
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EventDatabaseActionCell;
