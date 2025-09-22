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

export const EventDatabaseTableContext =
  createContext<TEventDatabaseTableContext | null>(null);

function EventDatabaseTableContextProvider({
  fetchedData,
  children,
}: EventDatabaseTableContextProviderProps) {
  const [data, setData] = useState(fetchedData);
  const [isPaginationLoading, setIsPaginatoinLoading] = useState(false);

  function getAllUniqueChecklists<T extends "validation" | "answer">(
    responses: EventResponse[],
    action: T
  ): T extends "validation" ? ChecklistType[] : AnswerType[] {
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

    return Array.from(uniqueListMap.values()) as T extends "validation"
      ? ChecklistType[]
      : AnswerType[];
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
