import React from 'react'
import { Prisma } from '../../../../../generated/prisma';

type TableProps = {
    data: Prisma.EventGetPayload<{include: {response: true}}>;
}

function Table({data} : TableProps) {
    console.log(data.response)
  return (
    <section className="w-full flex flex-col justify-start gap-4">
        meow
    </section>

  )
}

export default Table