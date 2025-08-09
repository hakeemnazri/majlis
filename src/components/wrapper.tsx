"use client"

import EventButtonList from "./admin/edit-event/event-button-list"

type WrapperProps = {
    event: any[]
}

function Wrapper({event}:WrapperProps ) {
  return (
    <EventButtonList events={event} />
  )
}

export default Wrapper