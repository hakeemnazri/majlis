"use client";

import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
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
import {
  addValidation,
  editCheckbox,
  editInput,
  setAdminEventDatabasePagination,
} from "@/actions/adminDatabase.action";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  formActionEnums,
  useDatabaseStore,
} from "@/stores/admin/databaseStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ServerActionError,
  TEventDatabaseTableContext,
  TNameSchema,
} from "@/lib/types";
import { nameSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";

type EventDatabaseTableContextProviderProps = {
  fetchedData: EventData;
  children: React.ReactNode;
};

type ChecklistType = EventResponse["checklist"][number];
type AnswerType = EventResponse["answer"][number];
type TagType = EventResponse["tag"][number];

type TypeMap = {
  validation: ChecklistType[];
  answer: AnswerType[];
  tag: TagType[];
};

// TODO: clean up
export const EventDatabaseTableContext =
  createContext<TEventDatabaseTableContext | null>(null);
function EventDatabaseTableContextProvider({
  fetchedData,
  children,
}: EventDatabaseTableContextProviderProps) {
  const [data, setData] = useState(fetchedData);
  const [refreshKey, setRefreshKey] = useState(0);
  const searchParams = useSearchParams();
  const {
    setId,
    setSlug,
    setCurrentPage,
    setEventId,
    setDialogClose,
    formAction,
    id,
    payload,
    currentPageSize,
    currentPage,
  } = useDatabaseStore((state) => state);

  const eventDatabaseForm = useForm<TNameSchema>({
    resolver: zodResolver(nameSchema),
  });

  function handleCloseDialog() {
    eventDatabaseForm.reset();
    setDialogClose();
    setId(null, formAction, false, undefined);
  }
  async function handleOnSubmit(action: formActionEnums) {
    if (action === "add-validation-column") {
      const values = eventDatabaseForm.getValues();
      await eventDatabaseForm.trigger("name");
      const formData = {
        ...values,
        eventId: data.event.id,
      };
      toast.promise(addValidation(formData), {
        loading: `Adding validation column...`,
        success: (data) => {
          if (!data.success) {
            throw new Error(data.error);
          }
          return `Validation column added successfully!`;
        },
        error: (error: ServerActionError) =>
          error.error || "Failed to add column",
      });
    }

    if (action === "edit-checkbox") {
      toast.promise(editCheckbox(id), {
        loading: `Editing checkbox...`,
        success: (data) => {
          if (!data.success) {
            throw new Error(data.error);
          }
          return `Checkbox edited successfully!`;
        },
        error: (error: ServerActionError) =>
          error.error || "Failed to edit checkbox",
      });
    }

    if (action === "edit-input") {
      toast.promise(editInput({ id, payload }), {
        loading: `Editing input...`,
        success: (data) => {
          if (!data.success) {
            throw new Error(data.error);
          }
          return `Input edited successfully!`;
        },
        error: (error: ServerActionError) =>
          error.error || "Failed to edit input",
      });
    }
    handleCloseDialog();
    setRefreshKey((prev) => prev + 1);
  }

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
          checked={
            row.original.checklist.find(
              (item) => item.Validation.id === checklist.Validation.id
            )?.isCheck || false
          }
          onCheckedChange={() =>
            setId(
              row.original.checklist.find(
                (item) => item.Validation.id === checklist.Validation.id
              )?.id || "",
              "edit-checkbox",
              true //isDialogOpen: True
            )
          }
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const inputValue = formData.get(
              `${
                row.original.answer.find(
                  (item) => item.survey.id === answer.survey.id
                )?.id
              }-input`
            );
            setId(
              row.original.answer.find(
                (item) => item.survey.id === answer.survey.id
              )?.id || null,
              "edit-input",
              true,
              inputValue?.toString() || ""
            );
          }}
        >
          <Input
            className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 min-w-35 w-full border-transparent bg-transparent text-center shadow-none focus-visible:border dark:bg-transparent"
            defaultValue={
              row.original.answer.find(
                (item) => item.survey.id === answer.survey.id
              )?.input || ""
            }
            name={`${
              row.original.answer.find(
                (item) => item.survey.id === answer.survey.id
              )?.id
            }-input`}
          />
        </form>
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
    const fetchData = async (pageNumber: number, pageSize: number) => {
      const data = await setAdminEventDatabasePagination({
        page: pageNumber || currentPage,
        pageSize: pageSize || currentPageSize,
        slug: fetchedData.event.slug,
      });

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      setData(data.events);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const pageSize = Number(urlParams.get("pageSize"));
    const pageNumber = Number(urlParams.get("pageNumber"));

    if (pageSize) {
      table.setPageSize(pageSize || currentPageSize);
    }
    if (pageNumber) {
      table.setPageIndex(pageNumber - 1 || currentPage);
    }

    fetchData(pageNumber, pageSize);
  }, [
    searchParams,
    fetchedData.event.slug,
    table,
    currentPage,
    currentPageSize,
    refreshKey,
  ]);

  useEffect(() => {
    setSlug(data.event.slug);
    setCurrentPage(data.currentPage);
    setEventId(data.event.id);
  }, [data, setCurrentPage, setSlug, setEventId]);

  return (
    <EventDatabaseTableContext.Provider
      value={{
        eventDatabaseForm,
        handleOnSubmit,
        handleCloseDialog,
        table,
        columns,
        data,
        setData,
      }}
    >
      {children}
    </EventDatabaseTableContext.Provider>
  );
}

export default EventDatabaseTableContextProvider;
