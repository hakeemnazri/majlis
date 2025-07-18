import FormStage from "@/components/admin/form-stage";
import FormCard from "@/components/admin/form-card";
import { BuildEventContextProvider } from "@/contexts/build-event-context-provider";

export default function BuildEvent() {
  
  return (
    <main className="flex flex-col h-full gap-4 w-full lg:max-w-4xl mx-auto">
      <BuildEventContextProvider>
        <FormStage />
        <FormCard />
      </BuildEventContextProvider>
    </main>
  );
}
