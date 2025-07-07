import FormStage from "@/components/admin/form-stage";
import FormCard from "@/components/admin/form-card";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-full w-300 max-w-2xl gap-4">
      <FormStage />

      <FormCard />
    </main>
  );
}
