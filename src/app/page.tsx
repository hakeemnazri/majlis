import FormStage from "@/components/admin/form-stage";
import FormCard from "@/components/admin/form-card";
import { BuildEventContextProvider } from "@/contexts/build-event-context-provider";

export default function Home() {
  return (
    <main className="flex flex-col h-full gap-4 w-full">
      <BuildEventContextProvider>
        <FormStage />
        <FormCard />
      </BuildEventContextProvider>
    </main>
  );
}
