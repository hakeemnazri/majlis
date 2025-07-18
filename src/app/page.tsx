"use client";

import FormFirstPage from "@/components/admin/build-event/form-first-page";
import FormSecondPage from "@/components/admin/build-event/form-second-page";
import FormStageButtons from "@/components/admin/build-event/form-stage-buttons";
import FormThirdPage from "@/components/admin/build-event/form-third-page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useBuildEventContext } from "@/lib/hooks/buildEvent.hook";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import React from "react";

const PLACEHOLDER_ID = "cmd5i02lx0000ty0kq9qinsxo";

function Home() {
  const { form } = useBuildEventContext();
  const { formPage } = useBuildFormStore((state) => state);

  return (
    <main className="flex justify-center items-center h-screen w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button>edit me boi</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Edit events here please.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()}>
              {formPage === 0 && <FormFirstPage />}
              {formPage === 1 && <FormSecondPage />}
            </form>
          </Form>
          <DialogFooter>
            <FormStageButtons />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default Home;
