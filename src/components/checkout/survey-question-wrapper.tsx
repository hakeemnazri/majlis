import prisma from "@/lib/prisma";
import React from "react";
import SurveyQuestions from "./survey-questions";
import EventSurveyFormContextProvider from "@/contexts/event-survey-form-context-provider";

async function SurveyQuestionWrapper() {
  const event = await prisma.event.findUnique({
    where: {
      id: "cmes66pas0002ty8hdypcshrt",
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

  //for table

  type THeader = {
    id: string;
    question: string;
  };

  const answerHeaders: THeader[] = [];
  const questionSet = new Set();

  event.response.forEach((response) => {
    response.answer?.forEach((answer) => {
      if (!questionSet.has(answer.survey.question)) {
        questionSet.add(answer.survey.question);
        const header: THeader = {
          id: answer.survey.id,
          question: answer.survey.question,
        };
        answerHeaders.push(header);
      }
    });
  });

  return (
    <div className="flex flex-col gap-20">
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
      <table>
        <thead>
          <tr>
            <th>Response ID</th>
            <th>Submission ID</th>
            {/* <th>Timestamp</th> */}
            {answerHeaders.map((header) => (
              <th key={header.id}>{header.question}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {event.response.map((response, index) => {
            // Create a map of question to answer for this response
            type TAnswerMap = {
              [key: string]: string | string[];
            };
            const answerMap: TAnswerMap = {};
            response.answer?.forEach((answer) => {
              const key = answer.survey.id;
              const value = answer.input || answer.checkbox || "";
              answerMap[key] = value;
            });

            return (
              <tr key={response.id}>
                <td>Response {index + 1}</td>
                <td>{response.submissionId}</td>
                {answerHeaders.map((header) => (
                  <td key={header.id}>{answerMap[header.id] || ""}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
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
