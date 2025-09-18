import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlignLeft,
  CheckSquare,
  Circle,
  ClipboardList,
  HelpCircle,
  Type,
} from "lucide-react";
import React from "react";
import { TEventPayload } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { SurveyType } from "../../../../generated/prisma";

type DrawerContentSurveyQuestionsProps = {
  survey: TEventPayload["survey"];
};

function DrawerContentSurveyQuestions({
  survey,
}: DrawerContentSurveyQuestionsProps) {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-4">
          <ClipboardList className="h-8 w-8 text-blue-600" />
          <div className="flex flex-col">
            <span>Survey Questions</span>
            <span className="text-sm text-gray-600">
              {survey.length} Question{survey.length !== 1 ? "s" : ""}{" "}
              configured
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-4">
        <section className="divide-y-2 space-y-6">
          {survey.map((question) => (
            <div key={question.id} className="space-y-4">
              {/* Question Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getQuestionTypeIcon(question.type)}
                  <Badge
                    variant="outline"
                    className={`${getQuestionTypeColor(question.type)} border`}
                  >
                    {getQuestionTypeLabel(question.type)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {question.isRequired ? "Required" : "Not Required"}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      question.isRequired ? "bg-red-400" : "bg-green-400"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Question Footer */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <h4 className="text-md font-medium text-gray-900 mb-1">
                    {question.question}
                  </h4>

                  {/* Question Type Preview */}
                  <div className="mt-3">
                    {question.type === "SHORT_ANSWER" && (
                      <div className="w-full h-10 bg-gray-100 rounded-md border-2 border-dashed border-gray-300 flex items-center px-3">
                        <span className="text-sm text-gray-500">
                          Short answer text
                        </span>
                      </div>
                    )}

                    {question.type === "PARAGRAPH" && (
                      <div className="w-full h-20 bg-gray-100 rounded-md border-2 border-dashed border-gray-300 flex items-start p-3">
                        <span className="text-sm text-gray-500">
                          Long answer text...
                        </span>
                      </div>
                    )}

                    {question.type === "MULTIPLE_CHOICE" &&
                      question.options &&
                      question.options.length > 0 &&
                      question.options[0] !== "" && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700 mb-3">
                            Options:
                          </p>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200"
                              >
                                <div className="w-4 h-4 rounded-full border-2 border-purple-300 flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">
                                  {option}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {question.type === "CHECKBOXES" &&
                      question.options &&
                      question.options.length > 0 &&
                      question.options[0] !== "" && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700 mb-3">
                            Options:
                          </p>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200"
                              >
                                <div className="w-4 h-4 rounded border-2 border-orange-300 flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">
                                  {option}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
}

const getQuestionTypeIcon = (type: SurveyType) => {
  switch (type) {
    case "SHORT_ANSWER":
      return <Type className="h-4 w-4 text-blue-600" />;
    case "PARAGRAPH":
      return <AlignLeft className="h-4 w-4 text-emerald-600" />;
    case "MULTIPLE_CHOICE":
      return <Circle className="h-4 w-4 text-purple-600" />;
    case "CHECKBOXES":
      return <CheckSquare className="h-4 w-4 text-orange-600" />;
    default:
      return <HelpCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getQuestionTypeLabel = (type: SurveyType) => {
  switch (type) {
    case "SHORT_ANSWER":
      return "Short Answer";
    case "PARAGRAPH":
      return "Paragraph";
    case "MULTIPLE_CHOICE":
      return "Multiple Choice";
    case "CHECKBOXES":
      return "Checkboxes";
    default:
      return type;
  }
};

const getQuestionTypeColor = (type: SurveyType) => {
  switch (type) {
    case "SHORT_ANSWER":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "PARAGRAPH":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "MULTIPLE_CHOICE":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "CHECKBOXES":
      return "bg-orange-50 text-orange-700 border-orange-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export default DrawerContentSurveyQuestions;
