"use client";

import { useBuildEventContext } from "@/lib/hooks/build-event-hooks";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import { Form } from "../ui/form";
import FormStageButtons from "./form-stage-buttons";
import FormFirstPage from "./form-first-page";
import FormSecondPage from "./form-second-page";
import FormThirdPage from "./form-third-page";

function MainForm() {
  // store
  const { formPage } = useBuildFormStore((state) => state);
  const { form } = useBuildEventContext();

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {formPage === 0 && <FormFirstPage />}
          {formPage === 1 && <FormSecondPage />}
          {formPage === 2 && <FormThirdPage />}
        </form>
      </Form>

      <FormStageButtons />
    </div>
  );
}

export default MainForm;
