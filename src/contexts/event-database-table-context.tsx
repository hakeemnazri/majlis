"use client";

import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import React, { createContext, useState } from "react";
import {
  EventData,
  EventResponse,
} from "@/components/admin/event-database/slug/EventDatabaseTable";
import { Button } from "@/components/ui/button";
import EventDatabaseActionCell from "@/components/admin/event-database/slug/event-database-action-cell";

type EventDatabaseTableContextProviderProps = {
  fetchedData: EventData;
  children: React.ReactNode;
};

type TEventDatabaseTableContext = {
  table: Table<EventResponse>;
  columns: ColumnDef<EventResponse>[];
  setData: React.Dispatch<React.SetStateAction<EventData>>;
  data: EventData;
  isPaginationLoading: boolean;
  setIsPaginatoinLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  console.log(fetchedData.responses);
  const [data, setData] = useState(fetchedData);
  const [isPaginationLoading, setIsPaginatoinLoading] = useState(false);

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
      <p className="text-center">
        {row.original.checklist
          .find((item) => item.Validation.id === checklist.Validation.id)
          ?.isCheck.toString() || ""}
      </p>
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
      <Button
        variant={"secondary"}
        onClick={() => console.log(row.original.remark)}
      >
        View
      </Button>
    ),
  };

  const uploadsColumn = {
    id: "uploads",
    header: () => <div className="text-center">Uploads</div>,
    accessorKey: "uploads",
    cell: ({ row }: CellContext<EventResponse, unknown>) => (
      <Button
        variant={"secondary"}
        onClick={() => console.log(row.original.upload)}
      >
        View
      </Button>
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

  return (
    <EventDatabaseTableContext.Provider
      value={{
        table,
        columns,
        data,
        setData,
        isPaginationLoading,
        setIsPaginatoinLoading,
      }}
    >
      {children}
    </EventDatabaseTableContext.Provider>
  );
}

export default EventDatabaseTableContextProvider;
