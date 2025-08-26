"use server";

import prisma from "@/lib/prisma";

export async function addValidation(id: string) {
 try {
    const eventResponses = await prisma.response.findMany({
        where:{
            eventId: id
        },
        select: {
            id: true
        }
    })

    const newValidations = eventResponses.map((response) => {
        return {
            responseId: response.id,
            type: "VALIDATION",
            isCheck: false
        }
    })

    await prisma.validation.createMany({
        data: newValidations
    })

    
 } catch (error) {
    console.log(error)
 }
}