import React from 'react'

function page({params}) {
  return (
    <div className=''>
      {params.role}
    </div>
  )
}

export default page