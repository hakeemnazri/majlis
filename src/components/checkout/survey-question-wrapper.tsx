import prisma from "@/lib/prisma";
import React from "react";
import SurveyQuestions from "./survey-questions";

async function SurveyQuestionWrapper() {
  const event = await prisma.event.findUnique({
    where: {
      id: "cmds2p7au0000ty0nz160a0se",
    },
    include: {
      survey: true,
      response: {
        include: {
          answer: true,
        },
      },
    },
  });

  if (!event) {
    return null;
  }

  const eventWithSurvey = {
    id: event.id,
    survey: event.survey,
  };

  return (
    <div>
      <SurveyQuestions event={eventWithSurvey} />
      <div className="flex flex-col gap-4">
        {event.response.map((response, index) => {
          return (
            <div key={response.id}>
              <p>Question {index + 1}</p>
              <p>{response.submissionId}</p>
              {response.answer.map((answer) => {
                return (
                  <div key={answer.id}>
                    <p>{answer.input}</p>
                    <p>{answer.checkbox}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SurveyQuestionWrapper;
