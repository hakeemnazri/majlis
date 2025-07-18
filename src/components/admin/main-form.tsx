"use client";

import { useBuildEventContext } from "@/lib/hooks/buildEvent.hook";
import { useBuildFormStore } from "@/stores/admin/buildFormStore";
import { Form } from "../ui/form";
import FormStageButtons from "./form-stage-buttons";
import FormFirstPage from "./form-first-page";
import FormSecondPage from "./form-second-page";
import FormThirdPage from "./form-third-page";
import FormFourthPage from "./form-fourth-page";
import AnimContainer from "./anim-container";

function MainForm() {
  // store
  const { formPage } = useBuildFormStore((state) => state);
  const { form } = useBuildEventContext();

  return (
    <div className="flex flex-col gap-8 transition-all">
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

      <FormStageButtons />
    </div>
  );
}

export default MainForm;
