"use client";

import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import React, { createContext, useEffect, useState } from "react";
import {
  EventData,
  EventResponse,
} from "@/components/admin/event-database/slug/table-data";
import { Button } from "@/components/ui/button";
import EventDatabaseActionCell from "@/components/admin/event-database/slug/event-database-action-cell";
import { useSearchParams } from "next/navigation";
import { setAdminEventDatabasePagination } from "@/actions/adminDatabase.action";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

type EventDatabaseTableContextProviderProps = {
  fetchedData: EventData;
  children: React.ReactNode;
};

type TEventDatabaseTableContext = {
  slug: string;
  table: Table<EventResponse>;
  columns: ColumnDef<EventResponse>[];
  setData: React.Dispatch<React.SetStateAction<EventData>>;
  data: EventData;
  isPaginationLoading: boolean;
  setIsPaginatoinLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
};

type ChecklistType = EventResponse["checklist"][number];
type AnswerType = EventResponse["answer"][number];
type TagType = EventResponse["tag"][number];

type TypeMap = {
  validation: ChecklistType[];
  answer: AnswerType[];
  tag: TagType[];
};

export const EventDatabaseTableContext =
  createContext<TEventDatabaseTableContext | null>(null);

function EventDatabaseTableContextProvider({
  fetchedData,
  children,
}: EventDatabaseTableContextProviderProps) {
  const [data, setData] = useState(fetchedData);
  const [isPaginationLoading, setIsPaginatoinLoading] = useState(false);
  const searchParams = useSearchParams();

  function getAllUniqueChecklists<T extends keyof TypeMap>(
    responses: EventResponse[],
    action: T
  ): TypeMap[T] {
    const uniqueListMap = new Map();

    if (action === "validation") {
      responses.forEach((response) => {
        response.checklist.forEach((checklist) => {
          uniqueListMap.set(checklist.Validation.id, checklist);
        });
      });
    }

    if (action === "answer") {
      responses.forEach((response) => {
        response.answer.forEach((answer) => {
          uniqueListMap.set(answer.survey.id, answer);
        });
      });
    }

    if (action === "tag") {
      responses.forEach((response) => {
        response.tag.forEach((tag) => {
          uniqueListMap.set(tag.id, tag);
        });
      });
    }

    return Array.from(uniqueListMap.values()) as TypeMap[T];
  }

  const checklistColumn: ColumnDef<EventResponse>[] = getAllUniqueChecklists(
    data.responses,
    "validation"
  ).map((checklist) => ({
    id: checklist.id,
    header: () => (
      <div className="text-center">{checklist.Validation.type}</div>
    ),
    accessorKey: checklist.id,
    cell: ({ row }: CellContext<EventResponse, unknown>) => (
      <div className="flex justify-center">
        <Checkbox
          className="h-8 w-8"
          // checked={
          //   row.original.checklist.find(
          //     (item) => item.Validation.id === checklist.Validation.id
          //   )?.isCheck || false
          // }
          onCheckedChange={() => {
            console.log(
              row.original.checklist.find(
                (item) => item.Validation.id === checklist.Validation.id
              )?.id
            );
          }}
        />
      </div>
    ),
  }));

  const responseAnswerColumn: ColumnDef<EventResponse>[] =
    getAllUniqueChecklists(data.responses, "answer").map((answer) => ({
      id: answer.id,
      header: () => <div className="text-center">{answer.survey.question}</div>,
      accessorKey: answer.id,
      cell: ({ row }: CellContext<EventResponse, unknown>) => (
        <p className="text-center">
          {row.original.answer.find(
            (item) => item.survey.id === answer.survey.id
          )?.input || ""}
        </p>
        // TODO: Add Checkbox type
      ),
    }));

  const tagColumn: ColumnDef<EventResponse>[] = getAllUniqueChecklists(
    data.responses,
    "tag"
  ).map((tag) => ({
    id: tag.id,
    header: () => <div className="text-center">{tag.AddedProps.type}</div>,
    accessorKey: tag.id,
    cell: ({ row }: CellContext<EventResponse, unknown>) => (
      <p className="text-center">
        {row.original.tag.find(
          (item) => item.AddedProps.id === tag.AddedProps.id
        )?.note || ""}
      </p>
    ),
  }));

  const actionColumn = {
    id: "actions",
    header: () => null,
    accessorKey: "actions",
    cell: ({ row }: CellContext<EventResponse, unknown>) => (
      <EventDatabaseActionCell row={row} />
    ),
  };

  const remarkColumn = {
    id: "remark",
    header: () => <div className="text-center">Remarks</div>,
    accessorKey: "remark",
    cell: ({ row }: CellContext<EventResponse, unknown>) => (
      <div className="flex justify-center">
        <Button
          variant={"secondary"}
          onClick={() => console.log(row.original.remark)}
        >
          View
        </Button>
      </div>
    ),
  };

  const uploadsColumn = {
    id: "uploads",
    header: () => <div className="text-center">Uploads</div>,
    accessorKey: "uploads",
    cell: ({ row }: CellContext<EventResponse, unknown>) => (
      <div className="flex justify-center">
        <Button
          variant={"secondary"}
          onClick={() => console.log(row.original.upload)}
        >
          View
        </Button>
      </div>
    ),
  };

  const indexColumn = {
    id: "no.",
    header: () => <div className="text-center">No.</div>,
    accessorKey: "no.",
    cell: ({ row }: CellContext<EventResponse, unknown>) => (
      <p className="text-center">{row.index + 1}</p>
    ),
  };

  const columns: ColumnDef<EventResponse>[] = [
    indexColumn,
    remarkColumn,
    uploadsColumn,
    ...checklistColumn,
    ...responseAnswerColumn,
    ...tagColumn,
    actionColumn,
  ];

  const table = useReactTable({
    data: data.responses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await setAdminEventDatabasePagination({
        page: Number(searchParams.get("pageNumber")) || 1,
        pageSize: Number(searchParams.get("pageSize")) || 10,
        slug: fetchedData.event.slug,
      });

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      setData(data.events);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const pageSize = urlParams.get("pageSize");
    const pageNumber = urlParams.get("pageNumber");

    if (pageSize) {
      table.setPageSize(Number(pageSize));
    }
    if (pageNumber) {
      table.setPageIndex(Number(pageNumber) - 1);
    }

    fetchData();
  }, [searchParams, fetchedData.event.slug, table]);

  return (
    <EventDatabaseTableContext.Provider
      value={{
        slug: data.event.slug,
        table,
        columns,
        data,
        setData,
        isPaginationLoading,
        setIsPaginatoinLoading,
        currentPage: data.currentPage,
      }}
    >
      {children}
    </EventDatabaseTableContext.Provider>
  );
}

export default EventDatabaseTableContextProvider;
