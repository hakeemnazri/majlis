"use client"


type WrapperProps = {
    event: string[]
}

function Wrapper({event}:WrapperProps ) {
  console.log(event)
  return (
    <p>meow</p>
    // <EventButtonList events={event} />
  )
}

export default Wrapper