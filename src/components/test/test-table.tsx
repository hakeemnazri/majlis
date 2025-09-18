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
          checklist: {
            include: {
              Validation: true;
            };
          };
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
  };
  type THeader = {
    id: string;
    question: string;
  };

  const answerHeaders: THeader[] = [];
  const validationHeaders: TValidationHeader[] = [];
  const questionSet = new Set();
  const validationSet = new Set();

  event.response.forEach((response) => {

    response.answer?.forEach((answer) => {
      if (!questionSet.has(answer.survey.id)) {
        questionSet.add(answer.survey.id);
        const header: THeader = {
          id: answer.survey.id,
          question: answer.survey.question,
        };
        answerHeaders.push(header);
      }
    });

    response.checklist?.forEach((checklist) => {
      if (!validationSet.has(checklist.Validation.id)) {
        validationSet.add(checklist.Validation.id);
        const validation = checklist.Validation;
        const header: TValidationHeader = {
          id: validation.id,
          title: validation.type,
        };
        validationHeaders.push(header);
      }
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
            <th>Delete</th>
            <th>Edit</th>
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
            type TValidationMap = {
              [key: string]: boolean;
            }
            const answerMap: TAnswerMap = {};
            response.answer?.forEach((answer) => {
              const key = answer.survey.id;
              const value = answer.input || answer.checkbox || "";
              answerMap[key] = value;
            });
            const validationMap: TValidationMap = {}
            response.checklist?.forEach((checklist) => {
              const key = checklist.Validation.id;
              const value = checklist.isCheck;
              validationMap[key] = value;
            })

            return (
              <tr key={response.id}>
                <td>Response {response.order}</td>
                <td><Button onClick={() => console.log(response.id + "delete")}>dlt</Button></td>
                <td><Button onClick={() => console.log(response.id + "edit")}>edit</Button></td>
                {validationHeaders.map((header) => (
                  <td key={header.id}>{validationMap[header.id].toString()}</td>
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
