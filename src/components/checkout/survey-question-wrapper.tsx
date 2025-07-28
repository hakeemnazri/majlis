import prisma from '@/lib/prisma'
import React from 'react'
import SurveyQuestions from './survey-questions'

async function SurveyQuestionWrapper() {
    const eventSurveyQuestions = await prisma.event.findUnique({
        where: {
            id: "cmdn4a6870000tyyva2flg4uj"
        },
        include: {
            survey: true,
        }
    })

    if(!eventSurveyQuestions) {
        return null
    }
    
  return (
    <SurveyQuestions surveyQuestions={eventSurveyQuestions.survey} />
  )
}

export default SurveyQuestionWrapper