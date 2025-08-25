import prisma from "@/lib/prisma";
import React from "react";
import SurveyQuestions from "./survey-questions";
import EventSurveyFormContextProvider from "@/contexts/event-survey-form-context-provider";

async function SurveyQuestionWrapper() {
  const event = await prisma.event.findUnique({
    where: {
      id: "cmeqqttnp000mty7z634hxz38",
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
      <EventSurveyFormContextProvider>
        <SurveyQuestions event={eventWithSurvey} />
      </EventSurveyFormContextProvider>
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
