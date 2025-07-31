import prisma from '@/lib/prisma'
import React from 'react'
import SurveyQuestions from './survey-questions'

async function SurveyQuestionWrapper() {
    const event = await prisma.event.findUnique({
        where: {
            id: "cmdp3kt6a0005tyyv2ofm9rzf"
        },
        include: {
            survey: true,
        }
    })

    if(!event) {
        return null
    }

    const eventWithSurvey = {
        id: event.id,
        survey: event.survey
    }
    
  return (
    <SurveyQuestions event={eventWithSurvey} />
  )
}

export default SurveyQuestionWrapper