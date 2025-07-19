"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import FormStageButtons from "../build-event/form-stage-buttons";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import FormFirstPage from "../build-event/form-first-page";
import FormSecondPage from "../build-event/form-second-page";
import FormThirdPage from "../build-event/form-third-page";
import FormFourthPage from "../build-event/form-fourth-page";
import { Form } from "@/components/ui/form";
import { useBuildEventContext } from "@/lib/hooks/buildEvent.hook";
import AnimContainer from "../build-event/anim-container";
import { EventWithRelations } from "@/lib/types";

type EventButtonList = {
  events: EventWithRelations[];
};

function EventButtonList({ events }: EventButtonList) {
  const [isOpen, setIsOpen] = useState(false);
  const { formPage } = useBuildFormStore((state) => state);
  const { form } = useBuildEventContext();

  const handleClick = (formData: EventWithRelations) => {
    form.reset(formData);
    setIsOpen(true);
  };
  return (
    <>
      {events.map((event) => (
          <Button key={event.id}
            onClick={() => handleClick(event)}
          >{`edit me boi for ${event.title}`}</Button>)
      )}
      
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>Edit events here please.</DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={(e) => e.preventDefault()}>
                <AnimContainer page={formPage}>
                  {formPage === 0 && <FormFirstPage />}
                  {formPage === 1 && <FormSecondPage />}
                  {formPage === 2 && <FormThirdPage />}
                  {formPage === 3 && <FormFourthPage />}
                </AnimContainer>
              </form>
            </Form>

            <DialogFooter>
              <FormStageButtons />
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  );
}

export default EventButtonList;
