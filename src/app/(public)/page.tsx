import EditFormWrapper from "@/components/admin/edit-event/edit-form-wrapper";
import SurveyQuestionWrapper from "@/components/checkout/survey-question-wrapper";
import { Suspense } from "react";


async function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen w-full gap-4">
      <p>kikiki</p>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFormWrapper />
        <SurveyQuestionWrapper />
      </Suspense>
    </main>
  );
}

export default Home;
