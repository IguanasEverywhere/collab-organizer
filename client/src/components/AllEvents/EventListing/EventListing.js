import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import lightStyles from './EventListingLight.module.css';
import darkStyles from './EventListingDark.module.css';


function EventListing({event}) {

  const viewMode = useSelector(state => state.viewMode.value)

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles
  return (
    <>
      <Link
        to={`/events/${event.id}`}
        key={event.id}
        className={currentStyle.listing}>
        {new Date(event.event_time).toLocaleDateString()} | {event.event_type} | {event.student ? event.student.name : "unassigned"} | {event.student ? event.student.instrument : "Unassigned student"}
      </Link>
    </>
  )
}

export default EventListing;