import FormStage from "@/components/admin/build-event/form-stage";
import FormCard from "@/components/admin/build-event/form-card";

export default function BuildEvent() {
  return (
    <main className="flex flex-col h-full gap-4 w-full lg:max-w-4xl mx-auto">
        <FormStage />
        <FormCard />
    </main>
  );
}
