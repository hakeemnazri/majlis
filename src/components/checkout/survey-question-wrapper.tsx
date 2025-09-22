import prisma from "@/lib/prisma";
import React from "react";
import SurveyQuestions from "./survey-questions";
import EventSurveyFormContextProvider from "@/contexts/event-survey-form-context-provider";
import TestTable from "../test/test-table";

async function SurveyQuestionWrapper() {
  const id = "cmfp35y860000tybdcfumedgh";
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      survey: true,
      response: {
        include: {
          answer: {
            include: {
              survey: true,
            },
          },
          checklist: {
            include: {
              Validation: true,
            }
          },
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
    <div className="flex flex-col gap-20 overflow-x-auto w-full">
      <EventSurveyFormContextProvider>
        <SurveyQuestions event={eventWithSurvey} />
      </EventSurveyFormContextProvider>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <TestTable event={event} id={id} />
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="flex flex-col gap-4">
        {event.response.map((response, index) => {
          return (
            <div key={response.id}>
              <p className="font-bold">Response {index + 1}</p>
              <p>{response.submissionId}</p>
              {response.answer.map((answer) => {
                return (
                  <div key={answer.id}>
                    <p className="font-bold">{answer.survey.question}</p>
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
