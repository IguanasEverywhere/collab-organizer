import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lightStyles from './AllEventsLight.module.css';
import darkStyles from './AllEventsDark.module.css';
import { Link } from 'react-router-dom';
import EventListing from './EventListing/EventListing';

function AllEvents() {

  const viewMode = useSelector(state => state.viewMode.value)
  const loggedInUser = useSelector(state => state.loggedInUser)

  const [allEvents, setAllEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(12)

  console.log(selectedMonth)

  useEffect(() => {

    fetch('/api/events')
      .then(r => r.json())
      .then(eventsData => setAllEvents(eventsData))
  }, [])

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  const handleMonthSelect = (e) => {
    setSelectedMonth(e.target.value)
  }

  return (
    <div className={currentStyle.mainBody}>
      <h1>All Events for Coordinator: {loggedInUser.value.payload.username}</h1>
      <div className={currentStyle.subHeaderArea}>
        <Link to='/new-event'><button className={currentStyle.addNewBtn}>Add New Event</button></Link>
        <h4>Filter Items By Month:</h4>
        <select onChange={handleMonthSelect}>
          <option value="12">All Events</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
      </div>

      <div className={currentStyle.eventsListing}>
        {allEvents.length === 0 ? <h3><br />You have no events scheduled!</h3> : null}

        {allEvents.map((event) => {
          if (parseInt(selectedMonth) === 12) {
            return <EventListing key={event.id} event={event} />
          }

          else if (new Date(event.event_time).getMonth() === parseInt(selectedMonth)) {
            return <EventListing key={event.id} event={event} />
          }
          return null;
        })
        }
      </div>
    </div>
  )

}

export default AllEvents;