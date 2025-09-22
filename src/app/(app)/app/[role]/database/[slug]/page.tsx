import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'

type pageProps = {
  params : {
    slug: string
  }
}

async function page({params} : pageProps ) {

  const event = await prisma.event.findFirst({
    where: {
      slug: params.slug
    }
  })

  if(event === null){
    notFound();
  }
  
  return (
    <div>page {event.title}</div>
  )
}

export default page