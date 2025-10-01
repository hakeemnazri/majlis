"use client";

import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  EventData,
  EventResponse,
  EventSurvey,
} from "@/components/admin/event-database/slug/table-data";
import { Button } from "@/components/ui/button";
import EventDatabaseActionCell from "@/components/admin/event-database/slug/event-database-action-cell";
import {
  addValidation,
  deleteValidation,
  editCheckbox,
  editInput,
  editValidation,
  editValidationIndex,
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
import { useEventResponseFormStore } from "@/stores/event/eventResponseFormStore";
import { useEventResponseFormContext } from "@/lib/hooks/contexts.hook";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronLeft, ChevronRight, Edit, Images, NotebookPen, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type EventDatabaseTableContextProviderProps = {
  fetchedData: EventData & EventSurvey;
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
  const { survey, ...eventDataProps } = useMemo(() => {
    const { survey, ...rest } = fetchedData;
    return { survey, ...rest };
  }, [fetchedData]);
  const eventData = { ...eventDataProps };
  const [data, setData] = useState(eventData);
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    setId,
    setSlug,
    setCurrentPage,
    setEventId,
    setDialogClose,
    formAction,
    id,
    payload,
  } = useDatabaseStore((state) => state);
  const { setSurvey, setEvent } = useEventResponseFormStore((state) => state);

  const { handleOnSubmitEventResponse } = useEventResponseFormContext();

  const eventDatabaseForm = useForm<TNameSchema>({
    resolver: zodResolver(nameSchema),
  });

  const handleCloseDialog = useCallback(() => {
    eventDatabaseForm.reset();
    setDialogClose();
    setId(null, formAction, false, undefined);
  }, [eventDatabaseForm, setDialogClose, setId, formAction]);

  const handleOnSubmit = useCallback(
    async (action: formActionEnums) => {
      let success = false;
      if (action === "add-validation-column") {
        const values = eventDatabaseForm.getValues();
        await eventDatabaseForm.trigger("name");
        const formData = {
          ...values,
          eventId: data.event.id,
        };
        const promise = addValidation(formData);
        toast.promise(promise, {
          loading: `Adding validation column...`,
          success: (data) => {
            if (!data.success) {
              throw new Error(data.error);
            }
            success = true;
            return `Validation column added successfully!`;
          },
          error: (error: ServerActionError) =>
            error.error || "Failed to add column",
        });
        await promise;
      }

      if (action === "remove-validation-column") {
        const data = {
          id,
        };
        const promise = deleteValidation(data);
        toast.promise(promise, {
          loading: `Deleting validation column...`,
          success: (data) => {
            if (!data.success) {
              throw new Error(data.error);
            }
            success = true;
            return `Validation column deleted successfully!`;
          },
          error: (error: ServerActionError) =>
            error.error || "Failed to delete column",
        });
        await promise;
      }

      if (action === "edit-validation-column") {
        const values = eventDatabaseForm.getValues();
        await eventDatabaseForm.trigger("name");
        const data = {
          id,
          payload: values.name,
        };
        const promise = editValidation(data);
        toast.promise(promise, {
          loading: `Deleting validation column...`,
          success: (data) => {
            if (!data.success) {
              throw new Error(data.error);
            }
            success = true;
            return `Validation column deleted successfully!`;
          },
          error: (error: ServerActionError) =>
            error.error || "Failed to delete column",
        });
        await promise;
      }

      if (action === "edit-validation-index-column") {
        const data = {
          id,
          payload,
        };
        const promise = editValidationIndex(data);
        toast.promise(promise, {
          loading: `Editing validation index...`,
          success: (data) => {
            if (!data.success) {
              throw new Error(data.error);
            }
            success = true;
            return `Validation index edited successfully!`;
          },
          error: (error: ServerActionError) =>
            error.error || "Failed to edit validation index",
        });
        await promise;
      }

      if (action === "edit-checkbox") {
        const promise = editCheckbox(id);
        toast.promise(promise, {
          loading: `Editing checkbox...`,
          success: (data) => {
            if (!data.success) {
              throw new Error(data.error);
            }
            success = true;
            return `Checkbox edited successfully!`;
          },
          error: (error: ServerActionError) =>
            error.error || "Failed to edit checkbox",
        });
        await promise;
      }

      if (action === "edit-input") {
        const promise = editInput({ id, payload });
        toast.promise(promise, {
          loading: `Editing input...`,
          success: (data) => {
            if (!data.success) {
              throw new Error(data.error);
            }
            success = true;
            return `Input edited successfully!`;
          },
          error: (error: ServerActionError) =>
            error.error || "Failed to edit input",
        });
        await promise;
      }

      if (action === "add-response") {
        success = await handleOnSubmitEventResponse();
      }

      if (!success) return;

      handleCloseDialog();
      setRefreshKey((prev) => prev + 1);
    },
    [
      eventDatabaseForm,
      data.event.id,
      id,
      payload,
      handleOnSubmitEventResponse,
      handleCloseDialog,
    ]
  );

  const getAllUniqueChecklists = useCallback(
    <T extends keyof TypeMap>(
      responses: EventResponse[],
      action: T
    ): TypeMap[T] => {
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
    },
    []
  );

  const uniqueValidations = useMemo(
    () => getAllUniqueChecklists(data.responses, "validation"),
    [data.responses, getAllUniqueChecklists]
  );

  const uniqueAnswers = useMemo(
    () => getAllUniqueChecklists(data.responses, "answer"),
    [data.responses, getAllUniqueChecklists]
  );

  const uniqueTags = useMemo(
    () => getAllUniqueChecklists(data.responses, "tag"),
    [data.responses, getAllUniqueChecklists]
  );

  const columns: ColumnDef<EventResponse>[] = useMemo(() => {
    const checklistColumn: ColumnDef<EventResponse>[] = uniqueValidations.map(
      (checklist) => ({
        id: checklist.id,
        header: () => (
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="link" className="text-center">
                {checklist.Validation.type}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-2.5">
              <div className="flex gap-4 items-center h-8">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => {
                    setId(
                      checklist.Validation.id,
                      "edit-validation-index-column",
                      true,
                      "left"
                    );
                  }}
                  disabled={checklist.Validation.order === 1}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => {
                    setId(
                      checklist.Validation.id,
                      "edit-validation-index-column",
                      true,
                      "right"
                    );
                  }}
                  disabled={
                    checklist.Validation.order === uniqueValidations.length
                  }
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronRight />
                </Button>
                <Separator orientation="vertical" className="h-4" />

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setId(
                      checklist.Validation.id,
                      "edit-validation-column",
                      true
                    );
                  }}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setId(
                      checklist.Validation.id,
                      "remove-validation-column",
                      true
                    );
                  }}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>
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
                  true
                )
              }
            />
          </div>
        ),
      })
    );

    const responseAnswerColumn: ColumnDef<EventResponse>[] = uniqueAnswers.map(
      (answer) => ({
        id: answer.id,
        header: () => (
          <div className="text-center">{answer.survey.question}</div>
        ),
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
        ),
      })
    );

    const tagColumn: ColumnDef<EventResponse>[] = uniqueTags.map((tag) => ({
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
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => {
              console.log(row.original);
            }}
          >
            <NotebookPen className="h-10 w-10" />
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
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => {
              console.log(row.original);
            }}
          >
            <Images className="h-10 w-10" />
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

    return [
      indexColumn,
      remarkColumn,
      uploadsColumn,
      ...checklistColumn,
      ...responseAnswerColumn,
      ...tagColumn,
      actionColumn,
    ];
  }, [uniqueValidations, uniqueAnswers, uniqueTags, setId]);

  const table = useReactTable({
    data: data.responses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchData = useCallback(
    async (pageNumber: number, pageSize: number, slug: string) => {
      const result = await setAdminEventDatabasePagination({
        page: pageNumber,
        pageSize: pageSize,
        slug,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      setData(result.events);
    },
    []
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageSize = Number(urlParams.get("pageSize"));
    const pageNumber = Number(urlParams.get("pageNumber"));
    if (pageSize) {
      table.setPageSize(pageSize);
    }
    if (pageNumber) {
      table.setPageIndex(pageNumber - 1);
    }
    fetchData(pageNumber, pageSize, fetchedData.event.slug);
  }, [refreshKey, fetchedData.event.slug, fetchData, table]);

  useEffect(() => {
    setSlug(data.event.slug);
    setCurrentPage(data.currentPage);
    setEventId(data.event.id);
    setSurvey(survey);
    setEvent(data.event);
  }, [data, survey, setCurrentPage, setSlug, setEventId, setSurvey, setEvent]);

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
