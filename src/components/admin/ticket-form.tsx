import React from "react";
import { Button } from "../ui/button";
import { INPUT_TICKETS } from "@/lib/constants/admin.constant";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useBuildEventContext } from "@/lib/hooks/build-event-hooks";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";

type TicketFormProps = {
  index: number;
};

function TicketForm({ index }: TicketFormProps) {
  const {
    form,
    fieldArray: { move, remove, fields },
  } = useBuildEventContext();
  const handleMoveUp = (index: number) => {
    move(index, index - 1);
  };
  const handleMoveDown = (index: number) => {
    move(index, index + 1);
  };
  const handleRemoveTicket = (index: number) => {
    remove(index);
  };
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Label className="text-md font-semibold">Ticket {index + 1}</Label>
          {index > 0 && (
            <Button type="button" onClick={() => handleMoveUp(index)}>
              Up
            </Button>
          )}
          {index < fields.length - 1 && (
            <Button type="button" onClick={() => handleMoveDown(index)}>
              Down
            </Button>
          )}
          {fields.length > 1 && (
            <Button type="button" onClick={() => handleRemoveTicket(index)}>
              Remove
            </Button>
          )}
        </div>
        {INPUT_TICKETS.map((input) => (
          <FormField
            key={index + input.name}
            control={form.control}
            name={`registerTickets.${index}.${input.name}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={input.placeholder}
                    {...field}
                    value={field.value ?? ""}
                    className={cn(input.className, "w-full")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default TicketForm;
