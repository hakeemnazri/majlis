"use client";
import React from "react";
import { Button } from "../ui/button";
import { Prisma } from "../../../generated/prisma";
import { addValidation } from "@/actions/adminResponsesEdit.action";

type TestTableProps = {
  event: Prisma.EventGetPayload<{
    include: {
      survey: true;
      response: {
        include: {
          answer: {
            include: {
              survey: true;
            };
          };
          validation: true;
        };
      };
    };
  }>;
  id: string;
};

function TestTable({ event, id }: TestTableProps) {
  type TValidationHeader = {
    id: string;
    title: string;
    isCheck: boolean;
  };
  type THeader = {
    id: string;
    question: string;
  };

  const answerHeaders: THeader[] = [];
  const validationHeaders: TValidationHeader[] = [];
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

    response.validation?.forEach((validation) => {
      const header: TValidationHeader = {
        id: validation.id,
        title: validation.type,
        isCheck: validation.isCheck,
      };
      validationHeaders.push(header);
    });
  });

  const handleAddValidation = async (id: string) => {
    await addValidation(id);
  };
  return (
    <div>
      <Button onClick={() => handleAddValidation(id)}>Add Validation</Button>
      <table>
        <thead>
          <tr>
            <th>Response ID</th>
            <th>Submission ID</th>
            {validationHeaders.map((header) => (
              <th key={header.id}>{header.title}</th>
            ))}
            {answerHeaders.map((header) => (
              <th key={header.id}>{header.question}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {event.response.map((response) => {
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
                <td>Response {response.order}</td>
                <td>{response.submissionId}</td>
                {validationHeaders.map((header) => (
                  <td key={header.id}>{header.isCheck.toString()}</td>
                ))}
                {answerHeaders.map((header) => (
                  <td key={header.id}>{answerMap[header.id] || ""}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TestTable;
